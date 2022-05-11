import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { AddValuesComponent } from './add-values/add-values.component';

const routes: Routes = [
  {path:'list',component:ListComponent},
  {path:'add',component:AddComponent},
  {path:'add-values/:id',component:AddValuesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoriesRoutingModule { }
