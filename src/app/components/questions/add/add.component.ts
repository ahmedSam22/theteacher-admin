import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  questionForm: FormGroup;

  constructor( private globalService: GlobalService, private spinner:NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      'question_ar': new FormControl(null, Validators.required),
      'question_en': new FormControl(null, Validators.required),
      'answer_ar': new FormControl(null, Validators.required),
      'answer_en': new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    console.log(this.questionForm);
    this.spinner.show()
    this.globalService.addQuestion(this.questionForm.value).subscribe(questionResponse => {
 
      this.spinner.hide()
      Swal.fire(
        'نجااااح',
        'تم اضافة السؤال  بنجاح',
        'success'
        )
        console.log(questionResponse);
        this.router.navigate(['/app/question/list'])
    })
  }

}
