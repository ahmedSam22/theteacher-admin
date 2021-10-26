import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccasionsRoutingModule } from './occasions-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    OccasionsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OccasionsModule { }
