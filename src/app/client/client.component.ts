import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../service/service.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  template: `
  <form [formGroup]="testform">
    <div *ngFor="let item of data; let i = index">
      <label *ngIf="item.inputType != 'radio' && item.inputType != 'checkbox'" for="{{subitem[i]?.id}}">{{item.label}}:</label>
      <input type="{{item?.inputType}}" name="subitem[i]?.name" id="subitem[i]?.subId" value="subitem[i]?.value" formControlName={{item?.label}} >
      <label *ngIf="item.inputType == 'radio' || item.inputType == 'checkbox'" for="{{subitem[i]?.id}}">{{item.label}}</label>
      <mat-error *ngIf="isControlInvalid(item?.label)">
          <ng-container *ngIf="testform.get(item?.label)?.errors?.['required']">
            {{ item?.label }} is required
          </ng-container>
          <ng-container *ngIf="testform.get(item?.label)?.errors?.['pattern']">
            Invalid pattern
          </ng-container>
        </mat-error>
 
    </div>
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
  
      for (const response of this.data) {
        const subitems = JSON.parse(response.subitems);
        this.subitem.push(subitems);
      
      }
      console.log(this.subitem)
   
      this.data.forEach((item: any) => {
        const controlValidators = [];
        
        // Add pattern validator
        if (item.pattern) {
          controlValidators.push(Validators.pattern(item.pattern));
        }
        

        if (item.required === 'Yes') {
          controlValidators.push(Validators.required);
        } 
        if (item.inputType === 'email') { 
          controlValidators.push(Validators.email)
        }
        
        const control = new FormControl('', controlValidators);
        this.testform.addControl(item.label, control);
        
      });
     
    });

    
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.testform.get(controlName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }

}
