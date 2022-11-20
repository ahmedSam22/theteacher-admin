import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
form:FormGroup;
category:any ;
categories:any=[];
mainCategories:any=[]
all_categories:any=[]
subcategories_of_maincategories:any=[]
subCategories:any=[];
all_brands:any=[]
models_of_brands:any=[]
brands:any=[];
models:any=[];
years:any=[];
product_compatibles_model:any=[];
manufacture_date_id:any ;
product_compatibles_date:any
d_images:any =[]
images:any=[]
// selected:any
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router
    ) { }

  ngOnInit(): void {
    //this.selected=[4]
    this.form=this.formbuilder.group({
      name:['',Validators.required],
      price:['',Validators.required],
      discount_percent:['',Validators.required],
      piece_number:['',Validators.required],
      manufacture_place:['',Validators.required],
      description:['',Validators.required],
    
    })

    this.allCategories() ;
    this.allBrands() ;
    this.allYears();
  }


allCategories(){
   this.service.allCategories().subscribe((res:any)=>{
    this.all_categories=res['data']
   })
}

onChangeCategory(event){
 this.categories=event.value ;
 console.log("all selected categories" , this.categories)
 this.service.getSubcategoryByCategoryId(event.value).subscribe((res:any)=>{
 this.subcategories_of_maincategories=res['data']
 })
}

onChangeSubCategory(event){
  this.subCategories =event.value
    console.log("all selected subCategories" , this.subCategories)
}

allBrands(){
  this.service.getBrands().subscribe((res:any)=>{
    this.all_brands=res['data']
   })
}

onChangeBrands(event){
  this.brands=event.value ;
  console.log("all selected Brands",  this.brands)
   this.service.getModelsByBrandId(event.value).subscribe((res:any)=>{
   this.models_of_brands=res['data']
   console.log("asdfs",this.models_of_brands)
  })
}
 
onChangeModels(event){
  this.models =event.value
    console.log("all selected models" , this.models)
}
 
allYears(){
this.service.allYears().subscribe((res:any)=>{
   this.years=res['data']
  //  console.log("years" ,this.years )
})
}

onChangeManufactureDate(event){
  this.manufacture_date_id= event.value
  console.log("manufature year " , event.value)
}

onChangeCompatibleProductModel(event){
  this.product_compatibles_model= event.value
  console.log("product_compatibles_model", this.product_compatibles_model)
}

onChangeCompatibleYear(event) {
  this.product_compatibles_date=event.value
  console.log("comp dates",this.product_compatibles_date)
}
 
description_files:File[] = [];
onSelectDescription_images(event) {
 console.log(event.addedFiles);
 this.description_files.push(...event.addedFiles);

 let images_form = {
  files:this.description_files
}

this.service.uploadFiles(images_form).subscribe((res:any)=>{
  this.d_images=res['data']
  
})
}

onRemovedDescription_images(event) {
  console.log(event);
  this.description_files.splice(this.description_files.indexOf(event), 1);
}

files:File[] = [];
onSelect(event) {
 console.log(event.addedFiles);
 this.files=[]
 this.files.push(...event.addedFiles);

 let images_form = {
  files:this.files
}
 this.service.uploadFiles(images_form).subscribe((res:any)=>{
  this.images=res['data']
 })
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
 
convertArrayOfObjToStr(arrOfobjs){
  var subv=[]
  var newArray = arrOfobjs.reduce(function(acc, curr) {
    var findIfNameExist = acc.findIndex(function(item) {
       return item.cat === curr.cat;
     })
     if (findIfNameExist === -1) {
       let obj = {
         'cat': curr.cat,
         "value": [curr.sub]
       }
       acc.push(obj)
     } 
     else {
     acc[findIfNameExist].value.push(curr.sub)
     }
     return acc;
    }, []);
 
   console.log(newArray)
 
    for(var i=0 ; i<newArray.length ; i++){
      subv.push(newArray[i].value)
   }

   let finalStr = subv.map(a => a.join(",")).join('|');
 
  return finalStr;
}
submit(){

//convert subcategories from array of objects to string arranged based on categories
this.subCategories.sort((a,b) => (a.cat > b.cat) ? 1 : ((b.cat > a.cat) ? -1 : 0))
let str_sub = this.convertArrayOfObjToStr(this.subCategories)
console.log("add str_sub ", str_sub )

//convert models from array of objects to string arranged based on brands
this.models.sort((a,b) => (a.cat > b.cat) ? 1 : ((b.cat > a.cat) ? -1 : 0)) 
let str_mod =this.convertArrayOfObjToStr(this.models)
console.log("add str_mod", str_mod )
 
    // image:this.files[0],
    // desc_images:this.description_files
 
    let f={
      image :this.images,
      name:this.form.value.name,
      price:this.form.value.price,
      discount_percent:this.form.value.discount_percent,
      piece_number:this.form.value.name,
      manufacture_place:this.form.value.manufacture_place,
      description:this.form.value.description,
      manufacture_date_id:this.manufacture_date_id,
      categories: this.categories,
      subcategories:str_sub ,
      brands:this.brands ,
      models:str_mod ,
      product_compatibles: this.product_compatibles_model,
      product_compatibles_date:this.product_compatibles_date,
      desc_images:this.d_images
    }
 
    console.log('the sended form is ',f)
    this.spinner.show()
    this.service.addProducts(f).subscribe((res:any)=>{
    this.spinner.hide()
    console.log("addProducts",res)
    if(res.status==true){
     Swal.fire(
        `Success`,
        `${res.message}`,
        `success`
      )
       this.router.navigate(['app/products/lists'])
    }
    else {
      Swal.fire(
        `Fail`,
        `${res.errors[0]}`,
        `error`
      )
    }
   
    
    })
  }

 
}
