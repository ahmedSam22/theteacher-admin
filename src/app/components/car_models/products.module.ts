import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './list/list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddModelComponent } from './add-model/add-model.component';
import { EditModelComponent } from './edit-model/edit-model.component';


@NgModule({
  declarations: [ListComponent, ProductDetailsComponent, AddModelComponent, EditModelComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
