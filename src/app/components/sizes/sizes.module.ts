import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SizesRoutingModule } from './sizes-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    SizesRoutingModule
  ]
})
export class SizesModule { }
