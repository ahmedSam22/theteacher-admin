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
  dropdownList = [];
  dropdownSettings = {};
  selectedItems: any[];
 
  // brands;
  brandType ;
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
product_compatibles_date:any

d_images:any =[]
images:any=[]
////////////////////////////////////////
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router
    ) { }

  ngOnInit(): void {
 
    // this.categoriesSetting = {
    //   singleSelection: false,
    //   idField: 'id',
    //   textField: 'name',
    //   enableCheckAll:false,
    //   itemsShowLimit:0,
    //   allowSearchFilter: false ,
    //   disabled:true
    // };

    // this.subCategoriesSetting = {
    //   singleSelection: false,
    //   idField: 'id',
    //   textField: 'name',
    //   selectAllText: 'اختيار الكل ',
    //   unSelectAllText: 'الغاء الاختيار',
    //   itemsShowLimit: 20,
    //   allowSearchFilter: false
    // };

    // this.brandsSetting = {
    //   singleSelection: false,
    //   idField: 'id',
    //   textField: 'name',
    //   selectAllText: 'اختيار الكل ',
    //   unSelectAllText: 'الغاء الاختيار',
    //   itemsShowLimit: 10,
    //   allowSearchFilter: false
    // };

    // this.modelsSetting = {
    //   singleSelection: false,
    //   idField: 'id',
    //   textField: 'name',
    //   selectAllText: 'اختيار الكل ',
    //   unSelectAllText: 'الغاء الاختيار',
    //   itemsShowLimit: 10,
    //   allowSearchFilter: false
    // };

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

//categories
//  subConcat:any=[]
//  x:any=[]
//  y:any=[]
// m :any =[] ;
// flage=false
// delete :any = []
// onCategorySelect(item: any) {
//  this.flage=false
//   this.x=item
//   this.y= this.removeDuplicates(this.x)
//     console.log("onCategorySelect", this.y )
// }

// saveFunction(items ){
// //   // if(this.flage==false){
// //     // this.x=[]
// //     for(let i=0 ; i<items.length ; i++){
// //     this.category=items[i].id
// //     }
     
// // this.service.getSubcategoryByCategoryId(this.category).subscribe((res:any)=>{
// // this.subCategories=[]
// // this.subConcat=res['data']
// // this.subCategories=this.removeDuplicates(this.x)
 
// // this.x =this.merge( this.subCategories, this.subConcat);
// // this.x=this.removeDuplicates(this.x)
// // console.log("change false " , this.x)


// // })
// //  // }
// //   // else {
    
// //   // this.x= this.removeDuplicates(this.x)
// //   //  console.log("change true" , this.x)

// //   // }
// }
// onItemDeSelect(event){
 
//  // // this.x=[]
// //  console.log("remove" , this.flage)
// //   this.service.getSubcategoryByCategoryId(event.id).subscribe((res:any)=>{
// //     this.delete=res['data']
// //     console.log("deleted" ,this.delete)  
   
// //     for( var i=this.x.length - 1; i>=0; i--){
// //             for( var j=0; j< this.delete.length; j++){
// //                 if((this.x[i] &&this.x[i].category_id == this.delete[j].category_id)){
// //                this.x.splice(i, 1);
               
// //                }
// //              }
// //             }
            
// //            this.x= this.removeDuplicates(this.x)
           
// //             console.log("rest" ,this.x)  
// //   })
  
// }

//  removeDuplicates(arr) {
//   return arr.filter((item,
//       index) => arr.indexOf(item) === index);
// }
// saveFunction(items ) {
//  console.log("eeeeeeeevent" ,items)
    
//       for(let i=0 ; i<items.length ; i++){
//         this.category=items[i].id
//         }
         
//         this.allSubCategories(this.category);
    
//         console.log("yyyyy" ,this.y )
    
    
//     // this.category=items.id
//     // this.service.getSubcategoryByCategoryId(this.category).subscribe((res:any)=>{
//     //   this.x=res['data']

      

//     //     this.x=this.x.filter((item,
//     //       n) => this.x.indexOf(item) === n);

//     //    console.log("all Arr",this.y)
//     //    console.log("del Arr",this.x)
//     //   //  this.y[i] && 
//     //    for( var i=this.y.length - 1; i>=0; i--){
//     //         for( var j=0; j<this.x.length; j++){
//     //             if((this.y[i].category_id == this.x[j].category_id)){
//     //              this.y.splice(i, 1);
                  
//     //             }
//     //         }
//     //         }
//     //         console.log("res",this.y)
//     //  })
   
  
  
  
// }



//  ddd(aa1,aa2){
//   for( var i=this.m.length - 1; i>=0; i--){
//     for( var j=0; j<this.x.length; j++){
//         if((this.m[i] && this.m[i].category_id == this.x[j].category_id)){
//          this.m.splice(i, 1);
//           console.log("res",this.m)
//         }
//     }
//     }
//  }
// allSubCategories(category){
//   this.service.getSubcategoryByCategoryId(category).subscribe((res:any)=>{
//     this.subConcat=res['data']
//     this.x =this.merge( this.subCategories, this.subConcat);
//   // console.log("x",  this.x )
//   // this.onCategorySelect(this.x)
//    })
  
 
// }


// merge(first, second) {
 
//   for(let i=0; i<second.length; i++) {
//     first.push(second[i]);
//   }
// return first
// }
 
// onSelectAllCategories(items: any) {
  
//    console.log("Iteeeeeeeeeeems" , items )
 
// }

// //subcategory
// onSubCategorySelect(item: any) {
//   console.log("Item",this.subCategories)
// }

// onSelectAllSubCategories(items: any) {
//  console.log("Iteeeeeeeeeeems" , items )
// }

// //brands
// onBrandsSelect(item: any) {
// }

// onSelectAllBrands(items: any) {
//  console.log("Iteeeeeeeeeeems" , items )
// }

// //models
// onModelSelect(item: any) {
// }

// onSelectAllModels(items: any) {
//  console.log("Iteeeeeeeeeeems" , items )
// }  
// arr=[]
   
submit(){

let sub=[]
this.subCategories.sort((a,b) => (a.cat > b.cat) ? 1 : ((b.cat > a.cat) ? -1 : 0))
  //  console.log("subCategories",this.subCategories)
 
  var newArray = this.subCategories.reduce(function(acc, curr) {
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
    sub.push(newArray[i].value)
  }

  let str_sub = sub.map(a => a.join(",")).join('|');
  console.log("sub",sub)
  console.log("str_sub",str_sub);
//////////////////////////////////////////////////////////////
let mod=[]

this.models.sort((a,b) => (a.cat > b.cat) ? 1 : ((b.cat > a.cat) ? -1 : 0)) 

var newArray2 = this.models.reduce(function(acc, curr) {
  var findIfNameExist2 = acc.findIndex(function(item) {
     return item.cat === curr.cat;
   })
   if (findIfNameExist2 === -1) {
     let obj = {
       'cat': curr.cat,
       "value": [curr.sub]
     }
     acc.push(obj)
   } 
   else {
   acc[findIfNameExist2].value.push(curr.sub)
   }
   return acc;
  }, []);

console.log(newArray2)
for(var j=0 ; j<newArray2.length ; j++){
    mod.push(newArray2[j].value)
 }
  

let str_mod = mod.map(a => a.join(",")).join('|');
 
console.log("str_mod",str_mod);
 console.log("mod1",mod)
// let m =JSON.stringify(mod)
//  console.log("mod2",typeof(m),m)

/////////////////////////////////////////////////////////////////////////
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
