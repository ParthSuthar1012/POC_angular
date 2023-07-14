import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  template: `
    <div style="margin-top: 5rem; width: 450px">
      <form class="grid" [formGroup]="inputForm">
        <mat-form-field appearance="outline">
          <mat-label>Input Type</mat-label>
          <mat-select formControlName="inputType">
            <mat-option *ngFor="let item of types" [value]="item.value">
              {{ item.displayValues }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="k['inputType'].errors?.['required']">
            inputtype is required
          </mat-error>
        </mat-form-field>

        <mat-form-field    *ngIf="
            k['inputType'].value !== 'radio' &&
            k['inputType'].value !== 'checkbox' && k['inputType'].value !== 'button'
          " appearance="outline">
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
            k['inputType'].value !== 'checkbox' && k['inputType'].value !== 'select' && k['inputType'].value !== 'button' 
          "
        >
          <mat-label>Pattern</mat-label>
          <mat-select formControlName="pattern">
            <mat-option value="">--</mat-option>
            <mat-option value="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">Password</mat-option>
            <mat-option value="[0-9]+$">only number</mat-option>
            <mat-option value="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
              >Email</mat-option
            >
            <mat-option value="^[a-zA-Z]+$">only alphabet</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Label</mat-label>
          <input matInput placeholder="Label" formControlName="label" />
          <mat-error *ngIf="k['label'].errors?.['required']">
            Label is required
          </mat-error>
        </mat-form-field>

        <div class="flex"   appearance="outline"
          *ngIf="
            k['inputType'].value === 'radio' ||
            k['inputType'].value === 'checkbox' || k['inputType'].value === 'select'
          " formGroupName="subitems">
          <mat-form-field style="width: 140px;" appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput placeholder="Name" formControlName="name" />
            <mat-error *ngIf="k['subitems'].get('name')?.errors?.['required']">
              Name is required
            </mat-error>
          </mat-form-field>

          <mat-form-field style="width: 140px;" appearance="outline">
            <mat-label>Id</mat-label>
            <input matInput placeholder="Id" formControlName="subId" />
            <mat-error *ngIf="k['subitems'].get('subId')?.errors?.['required']">
              Name is required
            </mat-error>
          </mat-form-field>
          <mat-form-field *ngIf=" k['inputType'].value !== 'select'"  style="width: 140px;" appearance="outline">
            <mat-label>Value</mat-label>
            <input matInput placeholder="Value" formControlName="value" />
            <mat-error *ngIf="k['subitems'].get('value')?.errors?.['required']">
              Name is required
            </mat-error>
          </mat-form-field>
          
        </div> 

        <div *ngIf="  k['inputType'].value === 'select'" formGroupName="subitems">
          <div class="flex" formArrayName="options">
            <div class="grid" *ngFor="let optionControl of options.controls; let i = index" [formGroupName]="i">
              <mat-form-field style="width: 140px;" appearance="outline">
                <mat-label>Value</mat-label>
                <input matInput placeholder="Value" formControlName="value" />
                <mat-error *ngIf="optionControl.get('value')?.errors?.['required']">
                  Value is required
                </mat-error>
              </mat-form-field>
              <mat-form-field style="width: 140px;" appearance="outline">
                <mat-label>Display Value</mat-label>
                <input matInput placeholder="Display Value" formControlName="displayValue" />
                <mat-error *ngIf="optionControl.get('displayValue')?.errors?.['required']">
                  Display Value is required
                </mat-error>
              </mat-form-field>
              <button  mat-raised-button color="warn" (click)="removeOption(i)">
               Remove
              </button>
             
            </div>
           
          </div>
          <button class="margin-top" mat-raised-button color="primary" (click)="addOption()">
            Add Option
          </button>
        </div>

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
    { value: 'text', displayValues: 'text' },
    { value: 'radio', displayValues: 'radio' },
    { value: 'password', displayValues: 'password' },
    { value: 'email', displayValues: 'email' },
    { value: 'checkbox', displayValues: 'checkbox' },
    {value:'select', displayValues: 'dropdown'},
    { value : 'button' , displayValues: 'button'}
  ];
  validators: any = [];
  constructor(public fb: FormBuilder, public service: ServiceService, public router:Router) {}

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      inputType: ['', [Validators.required]],
      required: ['', [Validators.required]],
      pattern: [''],
      label: ['', [Validators.required]],
      subitems: this.fb.group({
        name: [''],
        subId: [''],
        value: [''],
        options: this.fb.array([]),
      }),
    });
console.log(this.types)



    const inputTypeControl = this.inputForm.get('inputType');

    inputTypeControl?.valueChanges.subscribe((value) => {
      const subitems = this.inputForm.get('subitems');

      if (value === 'select') {
        this.addOption()
      }
     if ( value === 'button' || value === 'radio' || value === 'checkbox') {
       this.inputForm?.get('required')?.clearValidators();
       this.inputForm?.get('required')?.updateValueAndValidity();
         
     } else {
      this.inputForm?.get('required')?.setValidators([Validators.required]);
       this.inputForm?.get('required')?.updateValueAndValidity();
     }

      if (value === 'radio' || value === 'checkbox') {
        subitems?.get('name')?.setValidators([Validators.required]);
        subitems?.get('subId')?.setValidators([Validators.required]);
        subitems?.get('value')?.setValidators([Validators.required]);
      }  
      else  {
        subitems?.get('name')?.clearValidators();
        subitems?.get('subId')?.clearValidators();
        subitems?.get('value')?.clearValidators();
      }

      if (value === 'select') {
        subitems?.get('name')?.setValidators([Validators.required]);
        subitems?.get('subId')?.setValidators([Validators.required]);
      }

    
      subitems?.get('name')?.updateValueAndValidity();
      subitems?.get('subId')?.updateValueAndValidity();
      subitems?.get('value')?.updateValueAndValidity();
    });
  }

  get k(): { [key: string]: AbstractControl } {
    return this.inputForm.controls;
  }

  get options(): FormArray {
    return this.inputForm.get('subitems.options') as FormArray;
  }  

  addOption(): void {
    const newOption = this.fb.group({
      value: ['', Validators.required],
      displayValue: ['', Validators.required],
    });
    this.options.push(newOption);
  }  

    removeOption(index: number): void {
    this.options.removeAt(index);
  }

  submit() {
   
    
    if (this.inputForm.valid) {
      const formValue = { ...this.inputForm.value };
      this.service.create(formValue).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/client'])
      });
      console.log(formValue);
    } else {
      console.log('Invalid form');
    }
  }
}
