import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveriesRoutingModule } from './deliveries-routing.module';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';



@NgModule({
  declarations:
   [ListComponent, DeliveryDetailsComponent],
  imports: [
    CommonModule,
    DeliveriesRoutingModule,
    NgxDropzoneModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DeliveryModule { }
