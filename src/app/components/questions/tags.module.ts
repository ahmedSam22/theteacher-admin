import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { TagsRoutingModule } from './tags-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';


@NgModule({
  declarations: [AddComponent, ListComponent, EditQuestionComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class TagsModule { }
