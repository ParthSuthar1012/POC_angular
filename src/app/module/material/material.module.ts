import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button'
import { MatChipsModule} from '@angular/material/chips'
import { MatIconModule} from '@angular/material/icon'
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class MaterialModule { }
