import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorRoutingModule } from './colors-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [
    CommonModule,
    ColorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatIconModule
  ]
})
export class ColorsModule { }
