import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Renderer2 } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminComponent } from '../admin.component';
import { InputField } from 'src/app/model/input-field';
import { config } from 'rxjs';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-drag-drop',
  // templateUrl: './drag-drop.component.html',
  template: `
    <div class="example-container">
      <h2>Form Elements</h2>
      <div
        cdkDropList
        #todoList="cdkDropList"
        [cdkDropListData]="todo"
        [cdkDropListConnectedTo]="[doneList]"
        class="example-list"
        (cdkDropListDropped)="drop($event, todoList)"
      >
        <div class="example-box" *ngFor="let item of todo" cdkDrag>
          {{ item.type }}
        </div>
      </div>
    </div>

    <div class="example-container ">
      <h2>From</h2>
      <div 
        cdkDropList
        #doneList="cdkDropList"
        [cdkDropListData]="done"
        [cdkDropListConnectedTo]="[todoList]"
        class="example-list drop-box"
        (cdkDropListDropped)="drop($event, doneList)"
      >
        <div *ngFor="let item of data; let i = index">
          <div
            *ngIf="
              item.inputType === 'text' ||
              item.inputType === 'email' ||
              item.inputType === 'password'
            "
          >
          <mat-form-field appearance="outline">
            <mat-label>{{ item.label }}</mat-label>
            <input matInput type="text" [placeholder]="subitem[i].placeholder" />
          </mat-form-field>
          </div>
          
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent {
  form!: FormGroup;
  todo: InputField[] = [
    { type: 'text' },
    { type: 'radio' },
    { type: 'checkbox' },
    { type: 'password' },
  ];
  data: any[] =[];
  done: any[] = [];
  subitem: any = [];
  constructor(
    private dialog: MatDialog,
    private renderer: Renderer2,
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
    dialogConfig.panelClass = 'dialogclass';
    const dialogRef = this.dialog.open(AdminComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.create(result).subscribe((res: any) => {
        
          this.data.push(res)

          const subitems = JSON.parse(res?.subitems);
          this.subitem.push(subitems);

          console.log(this.data);
        });

        console.log(this.done);
        console.log(this.subitem);
        this.todo = [
          { type: 'text' },
          { type: 'radio' },
          { type: 'checkbox' },
          { type: 'password' },
        ]
      }
    });
  }
}
