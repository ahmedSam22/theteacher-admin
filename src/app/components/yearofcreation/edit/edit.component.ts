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
      year:[this.data.year,Validators.required],
      year_id:[this.data.id,Validators.required],
    })
    
  }
 

  submit(){
    this.spinner.show()
    let form={
      ...this.form.value,
    }
    console.log('submitting the form', form)
    this.service.editYear(form).subscribe(res=>{
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم تعديل سنة الصنع بنجاح',
        'success'
      )
      this.dialog.closeAll()
    })
  }

  
}
