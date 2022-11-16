import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddModelComponent } from './add-model/add-model.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path:'list',component:ListComponent , data:{title:' قائمة موديلات السيارات'}},
  {path:'add',component:AddModelComponent ,data:{title:'اضافة موديل سياره '}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelsRoutingModule { }
