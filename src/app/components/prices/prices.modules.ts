import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricesRoutingModule } from'./prices-routing.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule } from '@angular/material/icon';
import { AddpriceComponent } from './addprice/addprice.component';
import {ListpricesComponent } from './listprices/listprices.component';

 

@NgModule({
  declarations: [AddpriceComponent,ListpricesComponent],
  imports: [
    CommonModule,
    PricesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatIconModule
  ]
})
export class PricesModule { }
