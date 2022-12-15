import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { PackagesListComponent } from './list/list.component';
import { ProviderDetailsComponent } from './provider-details/provider-details.component';
import { AddPackagesComponent } from './add-pack/add-pack.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PackagesListComponent, ProviderDetailsComponent, AddPackagesComponent, EditBrandComponent],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProviderModule { }
