import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form:FormGroup;
  image_edit=false;
  submitted=false
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
    ) { }

  ngOnInit(): void {
    console.log("hello");
    console.log( this.data );
    this.form=this.formbuilder.group({
      date:[this.data.date,Validators.required],
      manufacture_date_id:[this.data.id,Validators.required],
    })
    
  }
 
  get f() {return this.form.controls}
  submit(){
    this.submitted=true
    this.spinner.show()
    this.service.editYear(this.form.value).subscribe(res=>{
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
