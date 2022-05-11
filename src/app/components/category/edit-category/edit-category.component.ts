import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  dropdownList = [];
  dropdownSettings = {};
  selectedItems: any[];
  brands;
  form:FormGroup;
  image_edit=false;
  brandType;
  arr=[];
  showTypes=false;
  changType;
  @ViewChild('multiSelect') multiSelect;
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
    ) { }


  ngOnInit(): void {
    this.showTypes=false ;
    console.log("dattttttttttttta" , this.data.brands)
    this.selectedItems=this.data.brands
    for(let i=0 ; i<this.selectedItems.length ; i++){
       
      this.arr.push(this.selectedItems[i].id);
      
    }
    console.log("ssssssss",this.arr)
     
    this.form=this.formbuilder.group({
      name_ar:[this.data.name_ar,Validators.required],
      name_en:[this.data.name_en,Validators.required],
      affect_brand:[this.data.affect_brand,Validators.required],
      brands:[this.data.brands,Validators.required],
     
    })
     console.log("asdasdaSDAsdasasdaSD",this.form.value.brands);
    // this.form.value.brands.push(this.arr);
    this.service.getBrands().subscribe(res=>{
      this.brands = res['data'];
      this.dropdownList = this.brands
    })
 
    if(this.data.affect_brand==0 ){
      this.showTypes=false ;
    }
   else {
    this.showTypes=true ;
   }
  }

  files: File[] = [];
  
onSelect(event) {
  console.log(event.addedFiles[0]);
  this.files=[]
  this.files.push(...event.addedFiles);
  console.log(this.files[0])
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
onItemSelect(event){

}
onSelectAll(events){

}
onChangeBrand(e){
  this.changType=e ;
  if(this.changType==0){
    this.showTypes=false ;
  }
  else {
    this.showTypes=true ;
  }
}
  submit(){
   
    this.spinner.show()
    console.log('Form Work')
      console.log(this.files[0])
    let form={
      ...this.form.value,
     // image:this.files[0],
      main_specialist_id:this.data.id,
     
    }
    console.log('submitting the form', form)
    this.service.editCategory(form).subscribe(res=>{
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم تعديل الخدمة بنجاح',
        'success'
      )
      // this.router.navigate(['/app/category/list'])
      this.dialog.closeAll()
      console.log("cattttttttttttttt", res)
    })
  }

   

}
