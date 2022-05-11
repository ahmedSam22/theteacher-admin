import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  dropdownList = [];
  dropdownSettings = {};
  form:FormGroup;
  brands;
  selectedItems: any[];
  brandType ;
  showBrand=false; 
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.showBrand=false
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'اختيار الكل ',
      unSelectAllText: 'الغاء الاختيار',
      itemsShowLimit: 10,
      allowSearchFilter: false
    };
    this.form=this.formbuilder.group({
      name_ar:['',Validators.required],
      name_en:['',Validators.required],
    })
    this.service.getBrands().subscribe(res=>{
      this.brands = res['data'];
      this.dropdownList = this.brands
      console.log(this.dropdownList)

    })
  }

  files: File[] = [];

onSelect(event) {
  console.log('event.addedFiles[0]');
  console.log(event.addedFiles[0]);
  this.files=[]
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
onItemSelect(item: any) {
 
}
onSelectAll(items: any) {
 
}
onChangeBrand(event){
 
  this.brandType=event;
  console.log("Brand Type",this.brandType)
  if(this.brandType==0){
    this.showBrand=false
  }
  else{
    this.showBrand=true
  }
}
  submit(){
    console.log('Form Work')
    console.log(this.form.value)
    console.log(this.selectedItems)
    this.spinner.show()
    let f={
      name_ar:this.form.value.name_ar,
      image:this.files[0],
      affect_brand:this.brandType,
      brands:this.selectedItems,
      name_en:this.form.value.name_en,
    }
    console.log('the sended form is ',f)
    this.service.addCategory(f).subscribe(res=>{
      console.log(res)
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم إضافة الخدمة بنجاح',
        'success'
      )
      this.router.navigate(['/app/services/list'])
    })
  }

  // Hi(){
  //   console.log('dsjbhfsdjhgdjshg')
  // }

}
