import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpriceComponent } from './addprice/addprice.component';
import {ListpricesComponent } from './listprices/listprices.component';
const routes: Routes = [
  {path:'list',component:ListpricesComponent ,data:{title:'قائمة الأسعار'}},
  //{path:'add',component:AddpriceComponent ,data:{title:'قائمة الأسعار'}},
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricesRoutingModule { }
