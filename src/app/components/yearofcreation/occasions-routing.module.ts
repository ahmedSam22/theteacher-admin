import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path:'list',component:ListComponent,data:{title:'قائمة سنوات الصنع'}},
  {path:'add',component:AddComponent,data:{title:' إضافة سنة صنع '}},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccasionsRoutingModule { }
