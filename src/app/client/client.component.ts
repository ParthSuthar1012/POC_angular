import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../service/service.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  template: `


  <form  [formGroup]="testform">
    <div *ngFor="let item of data; let i = index">
      <label *ngIf="item.inputType != 'radio' && item.inputType != 'checkbox'" for="{{subitem[i]?.subId}}">{{item.label}}:</label>
      <input *ngIf="item.inputType != 'radio' && item.inputType != 'checkbox'" type="{{item?.inputType}}"  [formControlName]="item?.label" > 
      <!-- <input *ngIf="item.inputType == 'radio' || item.inputType == 'checkbox'" type="{{item?.inputType}}" [value]="subitem[i].value" [name]="subitem[i]?.name" [id]="subitem[i]?.subId"  [formControlName]="subitem[i]?.name"  > -->
      <input *ngIf="item.inputType == 'radio' || item.inputType == 'checkbox'" 
       type="{{item?.inputType}}" 
       [value]="subitem[i]?.value" 
       [name]="subitem[i]?.name" 
       [id]="subitem[i]?.subId"  
       [formControlName]="subitem[i]?.name">
      <label *ngIf="item.inputType == 'radio' || item.inputType == 'checkbox'" [for]="subitem[i]?.value1">{{item.label}}</label>
      <mat-error *ngIf="isControlInvalid(item?.label)">
          <ng-container *ngIf="testform.get(item?.label)?.errors?.['required']">
            {{ item?.label }} is required
          </ng-container>
          <ng-container *ngIf="testform.get(item?.label)?.errors?.['pattern']">
            Invalid pattern
          </ng-container>
        </mat-error>
      
    </div> 
    <button (click)="submit()">
          Submit
        </button>
    </form>
  `,
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
data: any;
label:string=''
type:string='';
subitem: any = []

testform!: FormGroup;

  constructor(public service:ServiceService,public fb: FormBuilder )
 {}  
  ngOnInit(): void {
    this.testform = this.fb.group({
    })
   this.Getall()

   console.log(this.testform)
  }
  get k(): { [key: string]: AbstractControl } {
    return this.testform.controls;
  }
 
  Getall() {
    this.service.getAll().subscribe((res) => {
      this.data = res;
  console.log(this.data)
      for (const response of this.data) {
        const subitems = JSON.parse(response.subitems);
        this.subitem.push(subitems);
      
      }
      console.log(this.subitem)
   
      this.data.forEach((item: any) => {
        const controlValidators = [];
        
      
        if (item.pattern) {
          controlValidators.push(Validators.pattern(item.pattern));
        }
        if (item.required === 'Yes') {
          controlValidators.push(Validators.required);
        } 
        if (item.inputType === 'email') { 
          controlValidators.push(Validators.email)
        }
        
      
        if(item.inputType == 'radio' ||  item.inputType == 'checkbox' ) {
          
          const subitems = JSON.parse(item.subitems);
          const control = new FormControl('', controlValidators); 
          console.log(subitems.value)
          this.testform.addControl(subitems.name, control);
        } else {
          const control = new FormControl('', controlValidators); 
          this.testform.addControl(item.label, control);
        }
        
        
      });
     
    });

    
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.testform.get(controlName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  } 

  submit() {
    // if ( this.testform.valid) {
    
      console.log(this.testform.value)
    // } else {
    //   console.log("Inavalid")
    // }
  }

}
