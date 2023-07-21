import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminComponent } from '../admin.component';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.scss']
})
export class SaveFormComponent implements OnInit {
submitForm !: FormGroup;
constructor(    @Inject(MAT_DIALOG_DATA) data: any,
private dialogRef: MatDialogRef<SaveFormComponent>,   public fb: FormBuilder, ) {}
  ngOnInit(): void {
    this.submitForm = this.fb.group({
      formName: ['', Validators.required]
    })
  }
  get k(): { [key: string]: AbstractControl } {
    return this.submitForm.controls;
  }

  submit() {
    if(this.submitForm.valid){
        console.log(this.submitForm.value);
        this.dialogRef.close(this.submitForm.value)
    }else{console.log("invalid")}
  }

}
