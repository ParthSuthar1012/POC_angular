import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-admin',
  template: `
    <div style="margin-top: 5rem;">
      <form class="grid" [formGroup]="inputForm">
        <mat-form-field appearance="outline">
          <mat-label>Input Type</mat-label>
          <mat-select formControlName="inputType">
            <mat-option *ngFor="let item of types" [value]="item.value">
              {{ item.value }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="k['inputType'].errors?.['required']">
            inputtype is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Required</mat-label>
          <mat-select formControlName="required">
            <mat-option value="Yes">Yes</mat-option>
            <mat-option value="No">No</mat-option>
          </mat-select>
          <mat-error *ngIf="k['required'].errors?.['required']">
            Select This
          </mat-error>
        </mat-form-field>

        <mat-form-field
          appearance="outline"
          *ngIf="
            k['inputType'].value !== 'radio' &&
            k['inputType'].value !== 'checkbox'
          "
        >
          <mat-label>Pattern</mat-label>
          <mat-select formControlName="pattern">
            <mat-option value="^d+$">only number</mat-option>
            <mat-option value="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
              >Email</mat-option
            >
            <mat-option value="^[a-zA-Z]+$">only alphabet</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field
          appearance="outline"
          *ngIf="
            k['inputType'].value === 'radio' ||
            k['inputType'].value === 'checkbox'
          "
        >
          <mat-label>Labels</mat-label>
          <mat-chip-grid #chipGrid aria-label="Enter keywords">
            <mat-chip-row
              *ngFor="let keyword of keywords"
              (removed)="removeKeyword(keyword)"
            >
              {{ keyword }}
              <button matChipRemove aria-label="'remove ' + keyword">
                <mat-icon>cancel</mat-icon>
              </button>
            </mat-chip-row>
          </mat-chip-grid>
          <input
            placeholder="New Lable..."
            [matChipInputFor]="chipGrid"
            (matChipInputTokenEnd)="add($event)"
          />
        </mat-form-field>

        <button mat-raised-button color="primary" (click)="submit()">
          Submit
        </button>
      </form>
    </div>
  `,
  styleUrls: ['./admin.component.scss'],
  providers: [],
})
export class AdminComponent implements OnInit {
  inputForm!: FormGroup;
  types: any = [
    { value: 'text' },
    { value: 'radio' },
    { value: 'password' },
    { value: 'email' },
    { value: 'checkbox' },
  ];
  keywords: any = [];
  formControl = new FormControl(['']);
  announcer = inject(LiveAnnouncer);
  constructor(public fb: FormBuilder, public service:ServiceService) {}

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      inputType: ['', [Validators.required]],
      required: ['', [Validators.required]],
      pattern: [''],
      keywords: [this.keywords]
    });
    this.Getall()
  }

  get k(): { [key: string]: AbstractControl } {
    return this.inputForm.controls;
  }

  removeKeyword(keyword: any) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.push(value);
    }
    console.log(this.keywords);
    event.chipInput!.clear();
  }

  submit() {
    if ( this.inputForm.valid) {
         this.service.create(this.inputForm.value).subscribe(res => {
          console.log(res);
          this.inputForm.reset()
         })
    }
    console.log(this.inputForm.value)
  }

  Getall() {
    this.service.getAll().subscribe(res => {
      console.table(res)
    })
  }
}
