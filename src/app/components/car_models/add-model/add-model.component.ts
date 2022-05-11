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

  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private dialog:MatDialog,
    private router:Router
    ) { }
  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name_ar:['',Validators.required],
      name_en:['',Validators.required],
      brand_id:['',Validators.required],
    });
    this.service.getBrands().subscribe(res=>{
      this.brands = res['data'];
    });
    
  }
  onSubmit(){
   // console.log('Form Work');
    //console.log(this.brands);
   // console.log(this.form.value)
    this.spinner.show();
    this.service.addModel(this.form.value).subscribe(res=>{
      console.log("services:",res)
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم إضافة الموديل بنجاح',
        'success'
      )
      this.dialog.closeAll();
      this.router.navigate(['/app/car-models/list'])
    })
  }
}