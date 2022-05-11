import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannersRoutingModule } from './banners-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [AddComponent, ListComponent, EditComponent],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    BannersRoutingModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BannersModule { }
