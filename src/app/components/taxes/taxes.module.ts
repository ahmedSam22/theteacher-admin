import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxesRoutingModule } from './taxes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule } from '@angular/material/icon';
import { editComponentTaxes } from './edit/edit.component';


@NgModule({
  declarations: [editComponentTaxes],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatIconModule
  ]
})
export class TaxesModule { }
