import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { TermsRoutingModule } from './terms-routing.module';
import { AddComponent } from './add/add.component';
 import { SafePipe } from '../../safepipe.pipe';
@NgModule({
  declarations: [AddComponent,SafePipe ],
  imports: [
    CommonModule,
    TermsRoutingModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class TermsModule { }
