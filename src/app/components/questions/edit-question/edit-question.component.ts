import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  questionForm: FormGroup;

  constructor(private spinner:NgxSpinnerService, private globalService: GlobalService, private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.questionForm = new FormGroup({
      'question_ar': new FormControl(this.data.question_ar, Validators.required),
      'question_en': new FormControl(this.data.question_en, Validators.required),
      'answer_ar': new FormControl(this.data.answer_ar, Validators.required),
      'answer_en': new FormControl(this.data.answer_en, Validators.required),
    })
  }

  onSubmit() {
    console.log(this.questionForm);
    let form = {
      ...this.questionForm.value,
      question_id:this.data.id
    }
    console.log(form)
    this.spinner.show()
    this.globalService.updateQuestion(form).subscribe( questionResponse => {
      
      this.spinner.hide()
      Swal.fire(
        'نجااااح',
        'تم تعديل السؤال  بنجاح',
        'success'
        )
        console.log(questionResponse);
      this.dialog.closeAll()
    })
  }
}
