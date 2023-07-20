import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminComponent } from '../admin.component';
import { InputField } from 'src/app/model/input-field';
import { config } from 'rxjs';
import { ServiceService } from 'src/app/service/service.service';
import { DialogConfig } from '@angular/cdk/dialog';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',

  styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent {
  form!: FormGroup;
  todo: InputField[] = [
    { inputType: 'text', displayName: 'text' },
    { inputType: 'radio', displayName: 'radio' },
    { inputType: 'password', displayName: 'password' },
    { inputType: 'email', displayName: 'email' },
    { inputType: 'checkbox', displayName: 'checkbox' },
    { inputType: 'select', displayName: 'dropdown' },
    { inputType: 'multipleSelect', displayName: 'dropdown(Multiple Select)' },
    { inputType: 'button', displayName: 'button' },
  ];
  data: any[] = [];
  done: any[] = [];
  subitem: any = [];
  isButtonVisible: boolean[] = [];
  constructor(
    private dialog: MatDialog,

    private formBuilder: FormBuilder,
    private service: ServiceService
  ) {
    this.form = this.formBuilder.group({});
  }

  drop(dropEvent: CdkDragDrop<InputField[]> | null, list: any) {
    if (!dropEvent) {
      return;
    }

    if (dropEvent.previousContainer === dropEvent.container) {
      moveItemInArray(
        dropEvent.container.data,
        dropEvent.previousIndex,
        dropEvent.currentIndex
      );
    } else {
      transferArrayItem(
        dropEvent.previousContainer.data,
        dropEvent.container.data,
        dropEvent.previousIndex,
        dropEvent.currentIndex
      );
    }

    if (dropEvent.previousContainer !== dropEvent.container) {
      this.openInputFieldDialog(
        dropEvent.container.data[dropEvent.currentIndex],
        list
      );
    }
  }

  openInputFieldDialog(inputField: InputField, list: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = inputField;
    dialogConfig.width = '500px';
    const dialogRef = this.dialog.open(AdminComponent, dialogConfig);
    console.log(dialogConfig.data)
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.service.create(result).subscribe((res: any) => {
          this.data.push(res);

          const subitems = JSON.parse(res?.subitems);
          this.subitem.push(subitems);

          console.log(this.data);
        });

        console.log(this.done);
        console.log(this.subitem);
        this.todo = [
          { inputType: 'text', displayName: 'text' },
          { inputType: 'radio', displayName: 'radio' },
          { inputType: 'password', displayName: 'password' },
          { inputType: 'email', displayName: 'email' },
          { inputType: 'checkbox', displayName: 'checkbox' },
          { inputType: 'select', displayName: 'dropdown' },
          { inputType: 'multipleSelect', displayName: 'dropdown(Multiple Select)' },
          { inputType: 'button', displayName: 'button' },
        ];
      }
    });
  }

  toggleButtons(show: boolean, index: number) {
    this.isButtonVisible[index] = show;
  }

  editInputField(item: any) {
    const element_Id = item?.element_Id;
    console.log(element_Id);
    console.log(item); 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = item;
    dialogConfig.width = '500px';
    const dialogRef = this.dialog.open(AdminComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(result);
      this.service.update(result,element_Id).subscribe((res:any) => {
        console.log(res);
        const index = this.data.findIndex(
          (obj) => obj.element_Id === element_Id
        );
        if (index !== -1) {
         
          this.data[index] = res;
        }
        const subitems = JSON.parse( res?.subitems)
        const subitemIndex = this.subitem.findIndex((obj : any) => obj.name === item.name || obj.placeholder == item.placeholder );
        if (subitemIndex !== -1) {
          this.subitem[subitemIndex] =subitems;
        }

      })
      console.log("new data",this.data)
      console.log("subitems",this.subitem)
    })
  }

  deleteInputField(item: any) {
    const element_Id = item?.element_Id;
    console.log(element_Id);
    this.service.delete(element_Id).subscribe(
      (res) => {
        console.log(res);
        const index = this.data.findIndex(
          (obj) => obj.element_Id === element_Id
        );
        console.log(index);
        if (index !== -1) {
          this.data.splice(index, 1);
        }
        console.log('new data', this.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
