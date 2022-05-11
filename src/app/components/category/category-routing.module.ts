import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
  {path:'list',component:ListComponent, data:{title:'قائمة الخدمات'}},
  {path:'add',component:AddCategoryComponent,data:{title:' اضافة خدمة جديده '}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
