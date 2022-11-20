import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
 
/////////////////SCAR///////////////////
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
product_compatibles_date:any=[];
image_edit=false;
image_edit2=false;
edit=[]
d_images:any =[]
images:any=[]
model_str:any
subcategory_str:any
////////////////////////////////////////
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
    ) { 
      console.log("ddddddddddddd",data)
    }


  ngOnInit(): void {
    var model_obj:any  , model_arr=[] , subcategory_obj:any , subcategory_arr=[]

    for(let i=0 ;i<this.data.descriptionImagesPaths.length; i++){
      this.edit[i]=false
    }
   
    this.form=this.formbuilder.group({
      name:[this.data.name,Validators.required],
      price:[this.data.price,Validators.required],
      discount_percent:[this.data.discount_percent,Validators.required],
      piece_number:[this.data.piece_number,Validators.required],
      manufacture_place:[this.data.manufacture_place,Validators.required],
      description:[this.data.description,Validators.required],
    })
 
  this.images[0]=this.data.imagePath
  this.d_images=this.data.descriptionImagesPaths
  this.manufacture_date_id=this.data.manufacture_date_id ;

  for(let i=0 ; i<this.data.categories.length ; i++){
      this.categories[i]=this.data.categories[i].id 
  }

  for(let i=0 ; i<this.data.brands.length ; i++){
     this.brands[i]=this.data.brands[i].id 
  }

  for(let i=0 ; i<this.data.compatibles.length ; i++){
      this.product_compatibles_model[i]=this.data.compatibles[i].model_id
      this.product_compatibles_date[i]=this.data.compatibles[i].manufacture_date_id 
  }
   
  //models user not change
  for(let i=0 ; i<this.data.models.length ; i++){
      model_obj={cat:this.data.models[i]?.brand_id , sub:this.data.models[i]?.id}
      model_arr.push(model_obj)
      console.log("create array of objects [{cat:x , sub:y}]",model_arr)
  }
    // subcategories user not change
  for(let j=0 ; j<this.data.subcategories.length ; j++){
      subcategory_obj={cat:this.data.subcategories[j]?.category_id , sub:this.data.subcategories[j]?.id}
      subcategory_arr.push(subcategory_obj)
      console.log("create array of objects [{cat:x , sub:y}]",subcategory_arr)
  }
    
  this.model_str=  this.convertArrofObjsToStr(model_arr)
  this.subcategory_str=  this.convertArrofObjsToStr(subcategory_arr)
    // console.log("final str model " , this.model_str)
    // console.log("final str subcategory_" , this.subcategory_str)

     
  
   
  this.allCategories() ;
  this.allBrands() ;
  this.allYears();

}
 
convertArrofObjsToStr(arrOfobjs){
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
   //  console.log("sub",subv)
   //  console.log("str_sub",finalStr);
    return finalStr;
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
 
description_files:File[] =[] ;
onSelectDescription_images(event) {
 
  for(let i=0 ;i<this.data.descriptionImagesPaths.length; i++){
     this.edit[i]=true
   
   }
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
  this.image_edit=true;
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

// filter(){
// // subcategory_ids:this.subcategory_str.slice(0,1) ,
// // model_ids:this.model_str.slice(0,1)  
// let form={
//   category_ids:this.categories[0] ,
// brand_ids:this.brands[0] , 
//   }

//   this.service.filterProduct(form).subscribe((res:any)=>{
//     console.log("edit filter" ,res['data'].products )
//   })
// }
submit(){
  
 // user change subcategories
 if(this.subCategories.length!=0) {

  this.subCategories.sort((a,b) => (a.cat > b.cat) ? 1 : ((b.cat > a.cat) ? -1 : 0))
   
  //console.log("subCategories",this.subCategories)
  
  this.subcategory_str=this.convertArrofObjsToStr(this.subCategories)
 }
 // user change models
 if (this.models.length!=0) {

  this.models.sort((a,b) => (a.cat > b.cat) ? 1 : ((b.cat > a.cat) ? -1 : 0)) 

 // console.log("models",this.models)
  
  this.model_str=this.convertArrofObjsToStr(this.models)
 }

  // let sub=[]
  // var newArray = this.subCategories.reduce(function(acc, curr) {
  //  var findIfNameExist = acc.findIndex(function(item) {
  //     return item.cat === curr.cat;
  //   })
  //   if (findIfNameExist === -1) {
  //     let obj = {
  //       'cat': curr.cat,
  //       "value": [curr.sub]
  //     }
  //     acc.push(obj)
  //   } 
  //   else {
  //   acc[findIfNameExist].value.push(curr.sub)
  //   }
  //   return acc;
  //  }, []);

  // console.log(newArray)

  //  for(var i=0 ; i<newArray.length ; i++){
  //   sub.push(newArray[i].value)
  // }

  // let str_sub = sub.map(a => a.join(",")).join('|');
  // console.log("sub",sub)
  // console.log("str_sub",str_sub);
//////////////////////////////////////////////////////////////
 
 
// let mod=[]

// var newArray2 = this.models.reduce(function(acc, curr) {
//   var findIfNameExist2 = acc.findIndex(function(item) {
//      return item.cat === curr.cat;
//    })
//    if (findIfNameExist2 === -1) {
//      let obj = {
//        'cat': curr.cat,
//        "value": [curr.sub]
//      }
//      acc.push(obj)
//    } 
//    else {
//    acc[findIfNameExist2].value.push(curr.sub)
//    }
//    return acc;
//   }, []);

// console.log(newArray2)
// for(var j=0 ; j<newArray2.length ; j++){
//     mod.push(newArray2[j].value)
//  }
  

// let str_mod = mod.map(a => a.join(",")).join('|');
 
// console.log("str_mod",str_mod);
//  console.log("mod1",mod)
// let m =JSON.stringify(mod)
//  console.log("mod2",typeof(m),m)

/////////////////////////////////////////////////////////////////////////
 
    let f={
      product_id:this.data.id ,
      image:this.images[0],
      name:this.form.value.name,
      price:this.form.value.price,
      discount_percent:this.form.value.discount_percent,
      piece_number:this.form.value.piece_number,
      manufacture_place:this.form.value.manufacture_place,
      description:this.form.value.description,
      manufacture_date_id:this.manufacture_date_id,
      categories: this.categories,
      subcategories:this.subcategory_str ,
      brands:this.brands ,
      models:this.model_str ,
      product_compatibles: this.product_compatibles_model,
      product_compatibles_date:this.product_compatibles_date,
      desc_images:this.d_images
       
    }
    
   console.log('the sended form is ', f)
   this.spinner.show()
    this.service.editProducts(f).subscribe((res:any)=>{
    this.spinner.hide()
    console.log("editProducts",res)
    if(res.status==true){
     Swal.fire(
        `Success`,
        `${res.message}`,
        `success`
      )
      this.dialog.closeAll();
      this.router.navigate(['/app/products/lists'])
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

 
