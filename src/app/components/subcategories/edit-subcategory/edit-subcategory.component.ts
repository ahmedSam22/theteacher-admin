import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
 

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.scss']
})
export class EditSubcategoryComponent implements OnInit {
 
  form:FormGroup;
  categories;
 
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
    ) { }
 
  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name :[this.data.name ,Validators.required],
      sub_category_id:[this.data.sub_category_id,Validators.required],
    })
  }
 
  
  submit(){
  
    this.spinner.show() 
    this.service.editSubCategory(this.form.value).subscribe(res=>{
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم تعديل القسم الفرعي بنجاح',
        'success'
      )
      this.dialog.closeAll()
      this.router.navigate(['/app/sub/list']);

      console.log("edit subcategory" , res)
    })
  }


}
