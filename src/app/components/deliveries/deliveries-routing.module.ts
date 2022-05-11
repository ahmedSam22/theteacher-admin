import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {path:'list',component:ListComponent,data:{title:'قائمة مسئولين التوصيل '} },
//   {path:'add',component:AddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveriesRoutingModule { }
