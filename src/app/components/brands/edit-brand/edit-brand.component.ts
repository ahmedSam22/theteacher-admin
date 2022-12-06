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
    console.log("Brands ",this.data)
    this.form=this.formbuilder.group({
      name:[this.data.name,Validators.required],
      description:[this.data.description,Validators.required],
    })
    
  }
  files: File[] = [];
  
  onSelect(event) {
    this.image_edit=true;
    console.log(event.addedFiles[0]);
    this.files=[]
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  
  get f() {return this.form.controls}
  submit(){
    this.submitted=true
    let form ; 
      form= {
        name:this.form.value.name,
        description:this.form.value.description,
        brand_id:+this.data.id,
        logo_image:this.files[0] || null
       }
       
     this.spinner.show()
     this.service.editBrand(form).subscribe(res=>{
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
