import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { editComponentTaxes } from './edit/edit.component';
 

const routes: Routes = [
  {path:'edit',component:editComponentTaxes,data:{title:'تعديل الإعدادات '}},
  
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxesRoutingModule { }
