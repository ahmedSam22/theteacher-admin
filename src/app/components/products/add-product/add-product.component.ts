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
submitted=false ;
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
    // manufacture_date_id:[null,Validators.required],
    this.form=this.formbuilder.group({
      name:[null,Validators.required],
      price:[null,Validators.required],
      discount_percent:[null],
      piece_number:[null,Validators.required],
      manufacture_place:[null,Validators.required],
      description:[null,Validators.required],
      category_ids:[null,Validators.required],
      subcategory_ids:[null,Validators.required],
      brand_ids:[null,Validators.required],
      model_ids:[null,Validators.required],
    
      product_compatibles_model_ids:[null,Validators.required],
      product_compatibles_manufacture_date_ids:[null,Validators.required],
    })

    this.allCategories() ;
    this.allBrands() ;
    this.allYears();
  }


allCategories(){
   this.service.allCategories().subscribe((res:any)=>{
    this.all_categories=res['data']
    console.log("all_categories" ,this.all_categories)
   })
}


convertArrayOfstringToArrayofInt(arr){
  var num =arr.map(function(str) {
      return parseInt(str); 
   });
 return num ;
 }


onChangeCategory(event){
 this.categories=event.value ;
 console.log("all selected categories" , this.categories)
//  this.service.getSubcategoryByCategoryId(event.value).subscribe((res:any)=>{
//  this.subcategories_of_maincategories=res['data']
//  })
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
 

 

   //console.log("newArray",newArray)
   let sortedProducts = newArray.sort((s1, s2) => {
     return s1.cat - s2.cat;
   });
  // newArray.sort((a,b) => (a.cat > b.cat) ? 1 : ((b.cat > a.cat) ? -1 : 0))
 // console.log("newArray22222",sortedProducts)
    for(var i=0 ; i<newArray.length ; i++){
      subv.push(newArray[i].value)
   }
   console.log("subv",subv)
   let finalStr = subv.map(a => a.join(",")).join('|');
 
  return finalStr;
}

// compare( a, b ) {
//   if ( a.last_nom < b.last_nom ){
//     return -1;
//   }
//   if ( a.last_nom > b.last_nom ){
//     return 1;
//   }
//   return 0;
// }

get f() {return this.form.controls}
submit(){ 
this.submitted=true
console.log("FFFFFFF" , this.form.value)
 
// let arr = this.subCategories.map(object => object.cat);  or
let arr = this.form.value.subcategory_ids.map(object => object.cat);
arr=this.convertArrayOfstringToArrayofInt(arr)
 
// let difference = this.categories.filter(x => arr.includes(x));   or
let difference = this.form.value.category_ids.filter(x => arr.includes(x));



// let arr = this.subCategories.map(object => object.cat);  or
let arr2 = this.form.value.model_ids.map(object => object.cat);
arr2=this.convertArrayOfstringToArrayofInt(arr2)
 
// let difference = this.categories.filter(x => arr.includes(x));   or
let difference2 = this.form.value.brand_ids.filter(x => arr2.includes(x));




// let str_sub = this.convertArrayOfObjToStr(this.subCategories) or
let str_sub = this.convertArrayOfObjToStr(this.form.value.subcategory_ids)

//convert models from array of objects to string arranged based on brands
// this.models.sort((a,b) => (a.cat > b.cat) ? 1 : ((b.cat > a.cat) ? -1 : 0))   or

this.form.value.model_ids.sort((a,b) => (a.cat > b.cat) ? 1 : ((b.cat > a.cat) ? -1 : 0)) 

// let str_mod =this.convertArrayOfObjToStr(this.models)  or
let str_mod =this.convertArrayOfObjToStr(this.form.value.model_ids)

    let newData = {};
    Object.entries(this.form.value)
      .filter(([, value]) => value != null)
      .forEach(([key, value]) => (newData[key] = value));
      
      // manufacture_date_id:this.manufacture_date_id,
    let f={
      ...newData,
      image :this.images,
      categories: difference,
      subcategories:str_sub ,
      brands:difference2,
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
   
     this.router.navigate(['/app/products/lists',difference[0],this.brands[0]]);
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
