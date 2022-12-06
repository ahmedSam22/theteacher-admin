import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent implements OnInit {

  form:FormGroup;
  brands = [];
  submitted:boolean=false
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private dialog:MatDialog,
    private router:Router
    ) { }
  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name :['',Validators.required],
      brand_id:['',Validators.required],
      description:['',Validators.required],
    });

    this.service.getBrands().subscribe(res=>{
      this.brands = res['data'];
    });
    
  }
  get f() {return this.form.controls}
  onSubmit(){
    this.submitted=true
    this.spinner.show();
    this.service.addModels(this.form.value).subscribe(res=>{
    //   console.log("services:",res)
    this.spinner.hide()
    
    if(res['status']==true) {
      Swal.fire(
        'نجاح',
        `${res['message']}`,
        'success'
      )
     this.router.navigate(['/app/car-models/list' , this.form.value.brand_id])
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