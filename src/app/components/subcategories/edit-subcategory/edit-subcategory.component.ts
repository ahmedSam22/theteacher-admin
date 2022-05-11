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
  typeval;
  form:FormGroup;
  categories;
  image_edit=false;
  baseUrl=environment.baseURL;
  selectedOpt ;
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
    ) { 
      this.categoryList()
    }
    changeType(e){
      this.typeval=e;
    //  this.form.value.type=this.typeval;
      console.log("type",this.typeval)
    }
  ngOnInit(): void {
    this.selectedOpt=this.data.type;
    console.log(this.data);
    this.form=this.formbuilder.group({
      name_en:[this.data.name_en,Validators.required],
      name_ar:[this.data.name_ar,Validators.required],
      main_specialist_id:[this.data.main_specialist_id,Validators.required],
      type:[this.data.type , Validators.required]
    })
  }

  categoryList(){
    this.spinner.show()
    this.service.allCategories().pipe(map(res=>res['data'])).subscribe(res=>{
    this.spinner.hide()
    console.log(res)
      this.categories=res
    })
  }
 
  closecard(){
    this.dialog.closeAll()

  }
  submit(){
    console.log('Form Work')
    this.spinner.show()
     
    this.service.editSubCategory({...this.form.value,secondary_specialist_id:this.data.id
    }).subscribe(res=>{
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم تعديل الخدمة بنجاح',
        'success'
      )
      this.dialog.closeAll()
      this.router.navigate(['/app/sub/list']);

      console.log("resssssssss" , res)
    })
  }


}
