import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
 
/////////////////SCAR///////////////////
changeCat:boolean=false 
changeCat2:boolean=false;
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
product_compatibles_date:any=[];
image_edit=false;
image_edit2=false;
 
d_images:any =[]
images:any=[]
model_str:any
subcategory_str:any
selected_date:any;

subCats:any=[]
modBrand:any=[]
 
 
////////////////////////////////////////
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
    ) { 
      console.log("ddddddddddddd", data )
    }
 
 model_obj:any  ;  model_arr=[];   subcategory_obj:any ; subcategory_arr=[]
  ngOnInit(): void {
    this.changeCat=false ;
    //for(let i=0 ;i<this.data.descriptionImagesPaths.length; i++){
    //   this.edit[i]=false
    // }
 
  this.images[0]=this.data.imagePath
  this.d_images=this.data.descriptionImagesPaths
  this.manufacture_date_id=+this.data.manufacture_date_id ;
  
  for(let i=0 ; i<this.data.categories.length ; i++){
      this.categories[i]=this.data.categories[i].id 
      this.categories=this.convertArrayOfstringToArrayofInt(this.categories)
  }
 
  for(let i=0 ; i<this.data.brands.length ; i++){
     this.brands[i]=this.data.brands[i].id 
     this.brands = this.convertArrayOfstringToArrayofInt(this.brands)
  }
 
  for(let i=0 ; i<this.data.compatibles.length ; i++){
      this.product_compatibles_model[i]=this.data.compatibles[i].model_id
      this.product_compatibles_model = this.convertArrayOfstringToArrayofInt(this.product_compatibles_model)

      this.product_compatibles_date[i]=this.data.compatibles[i].manufacture_date_id 
      this.product_compatibles_date = this.convertArrayOfstringToArrayofInt(this.product_compatibles_date)
  }
   
  //models user not change
  for(let i=0 ; i<this.data.models.length; i++){
     this.model_obj={cat:this.data.models[i]?.brand_id,sub:this.data.models[i]?.id}
      this.model_arr.push(this.model_obj)
      console.log("create array of objects Model [{cat:x , sub:y}]",this.model_arr)
     
  }
  // this.modBrand= [{sub:2,cat:2},{sub:3,cat:2},{sub:4,cat:2}]
  // subcategories user not change
  for(let j=0 ; j<this.data.subcategories.length ; j++){
       this.subCats.push(this.data.subcategories[j].id) ;
       this.subcategory_obj={cat:this.data.subcategories[j]?.category_id , sub:this.data.subcategories[j]?.id}
       this.subcategory_arr.push(this.subcategory_obj)
     // console.log("create array of objects Subcaegorys [{cat:x , sub:y}]",this.subcategory_arr)
  }

  this.subCats= this.convertArrayOfstringToArrayofInt(this.subCats)
  this.model_str=  this.convertArrofObjsToStr(this.model_arr)
  this.subcategory_str=  this.convertArrofObjsToStr(this.subcategory_arr)
    // console.log("final str model " , this.model_str)
    // console.log("final str subcategory_" , this.subcategory_str)
   


  // this.service.getSubcategoryByCategoryId(this.categories).subscribe((res:any)=>{
    // res.data.forEach(element => {
    //   element.unique_id= `${element.id}-${element.category_id}`
    // });
    // this.subcategories_of_maincategories=res['data']
   // console.log("this.subcategories_of_maincategories",this.subcategories_of_maincategories)
  //  })

  this.service.getModelsByBrandId(this.brands).subscribe((res:any)=>{
    this.models_of_brands=res['data']
    //  for(let i=0 ; i< this.models_of_brands.length ; i++){
    //   this.modBrand[i]=this.models_of_brands[i]?.id;    
    //   }
   // console.log("this.models_of_brands",this.models_of_brands)
    })
   
  this.form=this.formbuilder.group({
      name:[this.data.name,Validators.required],
      price:[this.data.price,Validators.required],
      discount_percent:[this.data.discount_percent,Validators.required],
      piece_number:[this.data.piece_number,Validators.required],
      manufacture_place:[this.data.manufacture_place,Validators.required],
      description:[this.data.description,Validators.required],
     
    })
   
 }
 
  compareItems(optionOne,optionTwo){
      //console.log("compareItems optionOne",optionOne.sub )
     // console.log("compareItems optionTwo",optionTwo )
       return optionOne.sub==optionTwo
   }

   compareModels(optionOne,optionTwo){
  //  console.log(" optionOne",optionOne )
  //  console.log("optionTwo",optionTwo )
    return optionOne.sub==optionTwo.sub
}

convertArrayOfstringToArrayofInt(arr){
 var num =arr.map(function(str) {
     return parseInt(str); 
  });
return num ;
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





  }

 
