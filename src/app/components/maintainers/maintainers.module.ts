import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaintainersRoutingModule } from './maintainers-routing.module';
import { MaintainersDetailsComponent } from './maintainers-details/maintainers-details.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations:
   [ListComponent, MaintainersDetailsComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    MaintainersRoutingModule,
    NgxDropzoneModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MaintainersModule { }
