import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ListComponent } from './list/list.component';
import { ProviderDetailsComponent } from './provider-details/provider-details.component';


@NgModule({
  declarations: [ListComponent, ProviderDetailsComponent],
  imports: [
    CommonModule,
    ProviderRoutingModule
  ]
})
export class ProviderModule { }
