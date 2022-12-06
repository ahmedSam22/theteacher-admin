import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
  ch=false;
  submitted:boolean=false
  @ViewChild('multiSelect') multiSelect;
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
    ) { }


  ngOnInit(): void {
    console.log("ssssssss",this.data)
     
    this.form=this.formbuilder.group({
      name:[this.data.name,Validators.required],
      category_id:[this.data.id,Validators.required],
      })
  
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

// onItemSelect(event){

// }
// onSelectAll(events){

// }

// onChangeBrand(e){
//   this.changType=e ;
//   if(this.changType==0){
//     this.showTypes=false ;
//   }
//   else {
//     this.showTypes=true ;
//   }
// }
// onChangeSpecialist(e){
//   this.selectedItems=e.value
//   console.log("CDDDDDD",this.selectedItems)
//   this.ch=true
// }
get f() {return this.form.controls}
  submit(){
    this.submitted=true
   let form= {
     ...this.form.value , 
     image:this.files[0] || null
   }
    this.spinner.show()
    
    this.service.editCategory(form).subscribe(res=>{
    this.spinner.hide()
    if(res['status']==true){
      Swal.fire(
        'نجاح',
        `${res['message']}`,
        'success'
      )
      this.router.navigate(['/app/services/list'])
      this.dialog.closeAll()
    }
    else {
      let error =res['errors']
      Swal.fire(
        'خطأ',
       `${error[0]}`,
        'error'
      )
    }
     })
  }

   

}
