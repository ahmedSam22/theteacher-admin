import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
 
const routes: Routes = [
  {path:'add',component:AddComponent,data:{title:' إضافة ملف الشروط والأحكام '}},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsRoutingModule { }
