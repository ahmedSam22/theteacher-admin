import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { BannersRoutingModule } from './banners-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProductsComponent} from './list-product/list-product.component'
import { EditProductComponent } from './edit-product/edit-product.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProductsRoutingModule } from './products-routing.modules';
 
import {MatSelectModule} from '@angular/material/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [AddProductComponent, ListProductsComponent, EditProductComponent],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    ProductsRoutingModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgMultiSelectDropDownModule
  ]
})
export class ProductsModule { }
