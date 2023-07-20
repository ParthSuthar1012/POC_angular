import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { DataTestComponent } from './dataTest/dataTest.component';

const routes: Routes = [{ path: '', component: DragDropComponent }, { path: 'test', component: DataTestComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
