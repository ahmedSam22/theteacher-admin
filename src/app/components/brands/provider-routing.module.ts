import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPackagesComponent } from './add-pack/add-pack.component';
import { PackagesListComponent } from './list/list.component';

const routes: Routes = [
  {path:'list',component:PackagesListComponent,data:{title:'قائمة الباقات'}},
  {path:'add',component:AddPackagesComponent,data:{title:'اضافة باقة '}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
