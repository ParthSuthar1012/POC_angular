import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../module/material/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DragDropComponent } from './drag-drop/drag-drop.component'
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SaveFormComponent } from './save-form/save-form.component';
import { FormListComponent } from './form-list/form-list.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AdminComponent,
    DragDropComponent,
    SaveFormComponent,
    FormListComponent,
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    DragDropModule,
    MatTableModule
  ]
})
export class AdminModule { }
