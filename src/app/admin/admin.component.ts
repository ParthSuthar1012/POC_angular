import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { InputField } from '../model/input-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  template: `
    <div style="margin-top: 5rem; width: 500px" class="dialogclass">
      <form class="grid" [formGroup]="inputForm">
        <mat-form-field appearance="outline">
          <mat-label>Input Type</mat-label>
          <mat-select formControlName="inputType"  >
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
          <input type="text"
           matInput
           formControlName="pattern"
           [matAutocomplete]="auto">
          <mat-autocomplete  #auto="matAutocomplete" [displayWith]="displayPattern">
            <mat-option value="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">Password</mat-option>
            <mat-option value="[0-9]+$">only number</mat-option>
            <mat-option value="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
              >Email</mat-option
            >
            <mat-option value="^[a-zA-Z]+$">only alphabet</mat-option>
            </mat-autocomplete>
      

        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Label</mat-label>
          <input matInput placeholder="Label" formControlName="label" />
          <mat-error *ngIf="k['label'].errors?.['required']">
            Label is required
          </mat-error>
        </mat-form-field>
    
      
        <mat-form-field  appearance="outline">
            <mat-label>Id</mat-label>
            <input matInput placeholder="Id" formControlName="Id" />
            <mat-error *ngIf="k['subitems'].get('Id')?.errors?.['required']">
              Id Is required
            </mat-error>
          </mat-form-field>

        <div class="flex"   appearance="outline"
          formGroupName="subitems">
          <mat-form-field  *ngIf="
            k['inputType'].value === 'radio' ||
            k['inputType'].value === 'checkbox' || k['inputType'].value === 'select' ||  k['inputType'].value === 'multipleSelect'
          " style="width: 140px;" appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput placeholder="Name" formControlName="name" />
            <mat-error *ngIf="k['subitems'].get('name')?.errors?.['required']">
              Name is required
            </mat-error>
          </mat-form-field>

         
          <mat-form-field style="width: 140px;" appearance="outline">
            <mat-label>Place Holder</mat-label>
            <input matInput placeholder="place holder" formControlName="placeholder" />
            
          </mat-form-field>
          
        </div> 

        <div *ngIf="  k['inputType'].value === 'select' || k['inputType'].value === 'multipleSelect' " formGroupName="subitems">
          <div class="flex" formArrayName="options">
            <div class="flex" *ngFor="let optionControl of options.controls; let i = index" [formGroupName]="i">
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
    {value:'multipleSelect', displayValues: 'dropdown(Multiple Select)'},
    { value : 'button' , displayValues: 'button'}
  ];
  validators: any = [];
  inputField: InputField = {
    type: ''
  }
  constructor(public fb: FormBuilder, public service: ServiceService, public router:Router,   @Inject(MAT_DIALOG_DATA) data : any,
  private dialogRef : MatDialogRef<AdminComponent>) {
       this.inputField.type = data.type;
  }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      inputType: [this.inputField.type, [Validators.required]],
      required: ['', [Validators.required]],
      pattern: [''],
      label: ['', [Validators.required]],
      Id: ['', [Validators.required]],
      subitems: this.fb.group({
        name: [''],
        placeholder: [''],
        options: this.fb.array([]),
      }),
    });




    const inputTypeControl = this.inputForm.get('inputType');

    inputTypeControl?.valueChanges.subscribe((value) => {
      const subitems = this.inputForm.get('subitems');

      if (value === 'select' || value === 'multipleSelect') {
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
      }  
      else  {
        subitems?.get('name')?.clearValidators();
      }

      if (value === 'select' || value === 'multipleSelect') {
        subitems?.get('name')?.setValidators([Validators.required]);
      }
      subitems?.get('name')?.updateValueAndValidity();
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

  displayPattern(value: string): string {
    switch (value) {
      case '(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}':
        return 'Password';
      case '[0-9]+$':
        return 'Only number';
      case '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$':
        return 'Email';
      case '^[a-zA-Z]+$':
        return 'Only alphabet';
        case '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$':
          return 'Email';
      default:
        return '';
    }
  }
  

  submit() {
   if(this.inputForm.valid) {
    // console.log('Submit',this.inputForm.value);
    this.dialogRef.close(this.inputForm.value);
   } else {
    console.log("invalid input")
   }
    
    // if (this.inputForm.valid) {
    //   const formValue = { ...this.inputForm.value };
    //   this.service.create(formValue).subscribe((res) => {
    //     console.log(res);
     
    //   });
    //   console.log(formValue);
    // } else {
    //   console.log('Invalid form');
    // }
  }
}
