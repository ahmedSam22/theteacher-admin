import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SizesRoutingModule } from './sizes-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    SizesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SizesModule { }
