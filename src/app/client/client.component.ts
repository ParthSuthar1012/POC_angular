import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../service/service.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-client',
  // templateUrl: './client.component.html',
  template: `
    <form [formGroup]="testform">
      <div *ngFor="let item of data; let i = index">
        <div
          *ngIf="
            item.inputType === 'text' ||
            item.inputType === 'email' ||
            item.inputType === 'password'
          "
        >
          <label for="{{ subitem[i]?.subId }}">{{ item.label }}:</label>
          <input type="{{ item?.inputType }}" [formControlName]="item?.label" />
        </div>

        <div *ngIf="item.inputType == 'select'">
          <label [for]="subitem[i].name">{{ item?.label }}: </label>
          <select
            [name]="subitem[i].name"
            [id]="subitem[i].subId"
            [formControlName]="item?.label"
          >
            <option
              *ngFor="let option of subitem[i]?.options"
              [value]="option.value"
            >
              {{ option.displayValue }}
            </option>
          </select>
        </div>

        <div *ngIf="item.inputType == 'multipleSelect'">
          <mat-form-field>
            <mat-label>{{ item?.label }}</mat-label>
            <mat-select multiple [formControlName]="item?.label">
              <mat-option
                *ngFor="let dv of subitem[i]?.options"
                [value]="dv?.value"
                >{{ dv.displayValue }}</mat-option
              >
            </mat-select>
          </mat-form-field>
        </div>

        <div *ngIf="item.inputType == 'button'">
          <button>{{ item?.label }}</button>
        </div>

        <input
          *ngIf="item.inputType == 'radio'"
          type="radio"
          [value]="subitem[i].value"
          [name]="subitem[i]?.name"
          [id]="subitem[i]?.subId"
          [formControlName]="subitem[i]?.name"
        />

        <input
          *ngIf="item.inputType == 'checkbox'"
          type="checkbox"
          [value]="subitem[i].value"
          [name]="subitem[i]?.name"
          [id]="subitem[i]?.subId"
          [formControlName]="subitem[i]?.name"
        />

        <label
          *ngIf="item.inputType === 'radio' || item.inputType === 'checkbox'"
          [for]="subitem[i]?.value"
          >{{ item.label }}</label
        >
        <div *ngIf="item.inputType != 'radio' && item.inputType != 'checkbox'">
          <mat-error *ngIf="isControlInvalid(item?.label)">
            <ng-container
              *ngIf="testform.get(item?.label)?.errors?.['required']"
            >
              {{ item?.label }} is required
            </ng-container>
            <ng-container
              *ngIf="testform.get(item?.label)?.errors?.['pattern']"
            >
              Invalid pattern
            </ng-container>
          </mat-error>
        </div>

        <div *ngIf="item.inputType == 'radio' || item.inputType == 'checkbox'">
          <mat-error *ngIf="isControlInvalid(subitem[i].name)">
            <ng-container
              *ngIf="testform.get(subitem[i].name)?.errors?.['required']"
            >
              {{ subitem[i].name }} is required
            </ng-container>
          </mat-error>
        </div>
      </div>
      <button (click)="submit()">Submit</button>
    </form>
  `,
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  data: any;

  subitem: any = [];
  selectedPeople = [];
  controlname: any;
  testform!: FormGroup;

  constructor(public service: ServiceService, public fb: FormBuilder) {}
  ngOnInit(): void {
    this.testform = this.fb.group({});
    this.Getall();
  }
  get k(): { [key: string]: AbstractControl } {
    return this.testform.controls;
  }

  ngAfterViewInit() {}

  Getall() {
    this.service.getAll().subscribe((res) => {
      this.data = res;

      for (const response of this.data) {
        const subitems = JSON.parse(response.subitems);
        this.subitem.push(subitems);
      }
      console.log('subitems', this.subitem);

      this.data.forEach((item: any) => {
        const controlValidators = [];

        if (item.pattern) {
          controlValidators.push(Validators.pattern(item.pattern));
        }
        if (item.required === 'Yes') {
          controlValidators.push(Validators.required);
        }
        if (item.inputType === 'email') {
          controlValidators.push(Validators.email);
        }

        if (item.inputType == 'radio' || item.inputType == 'checkbox') {
          if (item.inputType === 'checkbox') {
            const control = new FormControl(false, controlValidators);
            const subitems1 = JSON.parse(item.subitems);
            this.controlname = subitems1.name;
            this.testform.addControl(subitems1.name, control);
          } else {
            const control = new FormControl('', controlValidators);
            const subitems1 = JSON.parse(item.subitems);
            this.testform.addControl(subitems1.name, control);
          }
        } else {
          const control = new FormControl('', controlValidators);
          this.testform.addControl(item.label, control);
        }
      });
    });
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.testform.get(controlName);
    return control
      ? control.invalid && (control.touched || control.dirty)
      : false;
  }
  submit() {
    if(this.testform.valid){
    console.log(this.testform.value);
  
    }
  
    else{
      console.log("invalid");
    }
  }
}
