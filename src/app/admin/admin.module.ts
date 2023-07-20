import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../module/material/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DragDropComponent } from './drag-drop/drag-drop.component'
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DataTestComponent } from './dataTest/dataTest.component';

@NgModule({
  declarations: [
    AdminComponent,
    DragDropComponent,
    DataTestComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    DragDropModule,
    
  ]
})
export class AdminModule { }
