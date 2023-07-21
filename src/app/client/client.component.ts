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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',

  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  data: any;
 formId:any
 title:any
  subitem: any = [];
  selectedPeople = [];
  controlname: any;
  testform!: FormGroup;

  constructor(public service: ServiceService, public fb: FormBuilder,private router:ActivatedRoute) {}
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.formId = params.get('formId');
      console.log(this.formId);
    });
    this.testform = this.fb.group({});
    this.Getall();
  }
  get k(): { [key: string]: AbstractControl } {
    return this.testform.controls;
  }

  ngAfterViewInit() {}

  Getall() {
   
    this.service.getFormbyId(this.formId).subscribe((res:any)=>{
      // console.log(res)
      this.title = res.formName
      const data = JSON.parse(res?.configuration);
      this.data = data;
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
        if (item.required == true) {
          controlValidators.push(Validators.required);
        }
        if (item.inputType === 'email') {
          controlValidators.push(Validators.email);
        }

        // if (item.inputType == 'radio' || item.inputType == 'checkbox') {
        //   if (item.inputType === 'checkbox') {
        //     const control = new FormControl(false, controlValidators);
        //     const subitems1 = JSON.parse(item.subitems);
        //     this.controlname = subitems1.name;
        //     this.testform.addControl(subitems1.name, control);
        //   } else {
        //     const control = new FormControl('', controlValidators);
        //     const subitems1 = JSON.parse(item.subitems);
        //     this.testform.addControl(subitems1.name, control);
        //   }
        // } else {
          const control = new FormControl('', controlValidators);
          this.testform.addControl(item.label, control);
        // }
      });
      console.log(this.testform.controls)
    })



    // this.service.getAll().subscribe((res) => {
    //   this.data = res;

    //   for (const response of this.data) {
    //     const subitems = JSON.parse(response.subitems);
    //     this.subitem.push(subitems);
    //   }
    //   console.log('subitems', this.subitem);

    //   this.data.forEach((item: any) => {
    //     const controlValidators = [];

    //     if (item.pattern) {
    //       controlValidators.push(Validators.pattern(item.pattern));
    //     }
    //     if (item.required === 'Yes') {
    //       controlValidators.push(Validators.required);
    //     }
    //     if (item.inputType === 'email') {
    //       controlValidators.push(Validators.email);
    //     }

    //     if (item.inputType == 'radio' || item.inputType == 'checkbox') {
    //       if (item.inputType === 'checkbox') {
    //         const control = new FormControl(false, controlValidators);
    //         const subitems1 = JSON.parse(item.subitems);
    //         this.controlname = subitems1.name;
    //         this.testform.addControl(subitems1.name, control);
    //       } else {
    //         const control = new FormControl('', controlValidators);
    //         const subitems1 = JSON.parse(item.subitems);
    //         this.testform.addControl(subitems1.name, control);
    //       }
    //     } else {
    //       const control = new FormControl('', controlValidators);
    //       this.testform.addControl(item.label, control);
    //     }
    //   });
    // });
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
