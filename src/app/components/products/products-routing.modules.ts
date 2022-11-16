import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProductsComponent} from './list-product/list-product.component'
 

const routes: Routes = [
  {path:'lists',component:ListProductsComponent},
  {path:'add',component:AddProductComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
