import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../module/material/material.module';


@NgModule({
  declarations: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class ClientModule { }
