import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ExcelComponent } from './excel/excel.component';
import { ListProductsComponent} from './list-product/list-product.component'
 

const routes: Routes = [
  {path:'lists/:category/:brand',component:ListProductsComponent},
  {path:'add',component:AddProductComponent},
  {path:'addexcel',component:ExcelComponent},
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
