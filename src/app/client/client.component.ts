import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../service/service.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  data: any;
  subitem: any = [];

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
          const control = new FormControl('', controlValidators);

          const subitems1 = JSON.parse(item.subitems);

          // console.log(subitems1.name);
          this.testform.addControl(subitems1.name, control);
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
    // if(this.testform.valid){
      console.log(this.testform.value);
      // }
      // else{
      //   console.log("invalid");
      // }
    }
}
