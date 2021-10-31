import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { ListComponent } from './delivery/list/list.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ClientsComponent } from './clients/clients.component';
import { StoresComponent } from './stores/stores.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRelatedOrderComponent } from './user-related-order/user-related-order.component';


@NgModule({
  declarations: [AddUserComponent, ListComponent, ClientsComponent, StoresComponent, DeliveryComponent, UserDetailsComponent,UserRelatedOrderComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatIconModule,
  ]
})
export class UsersModule { }
