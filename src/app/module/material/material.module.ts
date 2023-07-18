import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button'
import { MatIconModule} from '@angular/material/icon'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
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
    MatIconModule,
    MatAutocompleteModule
  ]
})
export class MaterialModule { }
