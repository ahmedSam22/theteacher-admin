import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  submitted=false
  form:FormGroup;
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      date:['',Validators.required],
    })
  }
 
  get f() {return this.form.controls}
  submit(){
    this.submitted=true
    this.spinner.show()
    
    this.service.addYear(this.form.value).subscribe(res=>{
    this.spinner.hide()
    if(res['status']==true) {
      Swal.fire(
        'نجاح',
        `${res['message']}`,
        'success'
      )
      this.router.navigate(['/app/yearofcreation/list'])
     }
    else {
      let error = res['errors']
      Swal.fire(
        'خطأ',
         `${error[0]}`,
        'error'
      )
    }
    })
  }


}
