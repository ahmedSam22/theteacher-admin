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

  constructor(  private service:GlobalService,
    private spinner:NgxSpinnerService,    private router:Router,private formbuilder:FormBuilder,    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,) { }
form:FormGroup
  ngOnInit(): void {
    console.log(this.data)
    this.form=this.formbuilder.group({
      name_ar:[this.data.name_ar,Validators.required],
      name_en:[this.data.name_en,Validators.required],
    })
    console.log(this.form)
  }
  files: File[] = [];

  onSelect(event) {
    console.log(event.addedFiles[0]);
    this.files=[]
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  submit(){
    let formx = {
      // name:this.form.value.name,
      name_ar:this.form.value.name_ar,
      name_en:this.form.value.name_en,
      brand_id:this.data.id,
      image:this.files[0]
     }
     console.log(formx)
     this.spinner.show()
     this.service.editBrand(formx).subscribe(res=>{
     this.spinner.hide()
     Swal.fire(
         'نجاح',
         'تم تعديل البراند بنجاح',
         'success'
       )
       this.router.navigate(['/app/brands/list'])
      this.dialog.closeAll()

     })
  }
}
