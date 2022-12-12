import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {
  form:FormGroup;
  image_edit=false;
  submitted=false;
  constructor(  private service:GlobalService,
    private spinner:NgxSpinnerService,private router:Router,private formbuilder:FormBuilder, private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,) { }
 
  ngOnInit(): void {
    console.log("plan ",this.data)
    this.form=this.formbuilder.group({
      subscription_plan_id:[this.data.id,Validators.required],
      period:[this.data.period,Validators.required],
      days:[this.data.days,Validators.required],
      price:[this.data.price,Validators.required],
    })
    
  }
  files: File[] = [];
  
 
  
  get f() {return this.form.controls}
  submit(){
    this.submitted=true
    let form = {
      subscription_plan_id:this.form.value.subscription_plan_id,
      period:this.form.value.period,
      days:this.form.value.days,
      price:this.form.value.price, 
    }
       
     this.spinner.show()
     this.service.editPlan(form).subscribe(res=>{
       this.spinner.hide()
    
      if(res['status']==true) {
        Swal.fire(
          'نجاح',
          `${res['message']}`,
          'success'
        )
        this.router.navigate(['/app/brands/list'])
       this.dialog.closeAll()
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
