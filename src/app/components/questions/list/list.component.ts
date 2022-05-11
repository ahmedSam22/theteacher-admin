import { EditQuestionComponent } from './../edit-question/edit-question.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  questionsArr = [];

  constructor( private spinner:NgxSpinnerService, private dialog:MatDialog, private globalService: GlobalService ) { }

  ngOnInit(): void {
    this.globalService.questionsList().subscribe( allQuestions => {
      this.questionsArr = allQuestions['data'];
    });
  }

  onEditQuestion(questionObj) {
    let dialogRef = this.dialog.open( EditQuestionComponent, {
      data: questionObj,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
      this.globalService.questionsList().subscribe( allQuestions => {
        this.questionsArr = allQuestions['data'];
      });
    })
  }

  onDeleteQuestion(question_id) {
    this.globalService.deleteQuestion(question_id).subscribe( deleteResponse => {
      console.log(deleteResponse);
      this.spinner.hide()
      Swal.fire(
        'نجااااح',
        'تم حذف السؤال  بنجاح',
        'success'
        )
    });
    this.globalService.questionsList().subscribe( allQuestions => {
      this.questionsArr = allQuestions['data'];
    });
  }
}
