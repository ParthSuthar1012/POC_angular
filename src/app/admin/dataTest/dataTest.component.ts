import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dataTest',
  templateUrl: './dataTest.component.html',
  styleUrls: ['./dataTest.component.css']
})
export class DataTestComponent implements OnInit {
  formGroups!: FormGroup ;
   formData = [ {
    FormId: 1,
    FormName: 'testform1',
    Configuration: [
      {
        element_Id: 1,
        inputType: 'text',
        required: true,
        pattern: '',
        label: 'First Name',
        Id: 'fname',
        subitems: {
          placeholder: 'Enter your first name',
          name: 'First Name',
          options: [
            { value: '', displayName: '' },
            { value: '', displayName: '' },
            { value: '', displayName: '' }
          ]
        }
      },
    ]
  }];

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    const formData = this.formData[0]; // Assuming you have a single item in the array
    this.createFormGroup(formData.FormName, formData); 
   
  }


  createFormGroup(formName: any, data: any): FormGroup {
   
    formName = this.fb.group({});
    const controlValidators:any[] = [];

    for (const config of data.Configuration) {
    
      const control = new FormControl('', controlValidators);
      formName.addControl(config.label, control);
    }

    this.formGroups = formName; // Store the form group using the form name
     console.log(formName)
    return formName;
  } 


  submit() {
    console.log(this.formGroups)
  }
}
