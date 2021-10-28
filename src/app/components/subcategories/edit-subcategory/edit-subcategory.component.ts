import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.scss']
})
export class EditSubcategoryComponent implements OnInit {

  form:FormGroup;
  categories;
  image_edit=false;
  baseUrl=environment.baseURL;
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
    ) { 
      this.categoryList()
    }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name_ar:[this.data.name_ar,Validators.required],
      name_en:[this.data.name_en,Validators.required],
      category_id:[this.data.category_id,Validators.required],
    })
    console.log(this.data)
  }

  files: File[] = [];

  categoryList(){
    this.spinner.show()
    this.service.allCategories().pipe(map(res=>res['data'])).subscribe(res=>{
    this.spinner.hide()
    console.log('res')
      console.log(res)
      this.categories=res
    })
  }
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
    console.log('Form Work')
    this.spinner.show()
    let form={
      ...this.form.value,
      image:this.files[0],
      subcategory_id:this.data.id
    }
    this.service.editSubCategory(form).subscribe(res=>{
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم تعديل الفئة بنجاح',
        'success'
      )
      this.dialog.closeAll()
      this.router.navigate(['/app/sub/list'])
    })
  }

  Hi(){
    console.log('dsjbhfsdjhgdjshg')
  }

}
