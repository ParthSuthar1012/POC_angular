import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { FormListComponent } from './form-list/form-list.component';


const routes: Routes = [{ path: '', component: DragDropComponent }, {path:'forms',component:FormListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
