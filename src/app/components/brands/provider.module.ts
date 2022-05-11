import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ListComponent } from './list/list.component';
import { ProviderDetailsComponent } from './provider-details/provider-details.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListComponent, ProviderDetailsComponent, AddBrandComponent, EditBrandComponent],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProviderModule { }
