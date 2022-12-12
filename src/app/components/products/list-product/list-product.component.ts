import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { HttpClient } from '@angular/common/http';
import * as saveAs from 'file-saver';
 
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductsComponent implements OnInit {
  categories =[]
  category_change=[]
  subcategories=[]
  subcategory_change=[]
  models = [];
  brands = [];
  products :any = [] ;
  change_model:any=[];
  change_brand:any=[];
  param1:any ; 
  param2:any ; 
  sub_param:any;
  // @Input() pageIndex: any; 
  // paginator:any;
  // @ViewChild('vin') vin:ElementRef  ;
  bool_category:boolean=false ;
  bool_brand:boolean=false ;
  constructor(private http:HttpClient,private route: ActivatedRoute,private dialog:MatDialog,private spinner:NgxSpinnerService,private service: GlobalService , private router:Router) {
 
    }

  ngOnInit(): void {
    // this.bool_category=false;
    // this.bool_brand=false;
    // this.pageIndex=0 ;
    // this.vin =null ;
    // this.param1= this.route.snapshot.paramMap.get('category');
    // console.log("param1", this.param1)

    // this.param2= this.route.snapshot.paramMap.get('brand');
    // console.log("param2", this.param2)
    // this.categoryList();
    // this.getAllBrands() ;

    let form={
      // category_ids:[this.param1] ,
      // subcategory_ids:[],
      // brand_ids:[this.param2] , 
      model_ids:[],
      // page:this.pageIndex,
 
      }
  
      // this.service.filterProduct(form).subscribe((res:any)=>{
      //   this.products=res['data'].products
      //   this.products=[...this.products].reverse()
      //   console.log("filter" ,this.products )
      // })

      // console.log("pageIndex" ,this.pageIndex)
  }
  // onPaginateChange(event){
  //   this.pageIndex=event.pageIndex+1
  //   console.log(JSON.stringify( this.pageIndex  ) , this.pageIndex );
  //   this.filter()
  // }

  // changeVin() {
  //   console.log("vin",this.vin.nativeElement.value)
  // }

  // categoryList(){
  //   this.bool_category=false
  //   this.service.allCategories().subscribe((res:any)=>{
  //     this.categories = res['data']
  //     console.log("All Categories" ,this.categories)
  //     this.category_change[0]=this.param1
  //     this.getAllSubcategories(this.category_change)
  //   })
  // }

  // changeCategory(event) {
  //   this.bool_category=true
  //   this.category_change[0]=event.target.value
  //   this.getAllSubcategories(this.category_change)
  //   console.log("search category id",this.category_change[0])
  // }

  // getAllSubcategories(category){
  //   this.category_change[0]=category[0]
  //   this.service.getSubcategoryByCategoryId(this.category_change).subscribe((res:any)=>{
  //    this.subcategories=res['data']
  //       console.log("All SubCategories" , this.subcategories)
      
  //    })
  // }

  // changeSubcategory(event){
  // this.subcategory_change[0]=event.target.value
  // console.log("search subcategory id",this.subcategory_change[0])
  // }

  // getAllBrands(){
  //   this.bool_brand=false
  //   this.service.getBrands().subscribe((res:any)=>{ 
  //     this.brands=res['data'] ;
  //     console.log("All Brands" , this.brands)
  //     this.change_brand[0]=this.param2 ;
  //     this.getAllModels(this.change_brand);
  //   })
  // }

  // changeBrands(event) {
  //   this.bool_brand=true
  //   this.change_brand[0]=event.target.value
  //   this.getAllModels(this.change_brand)
  //   console.log("search brands id" , this.change_brand[0])
  // }

  // getAllModels(model){
  //   this.change_brand[0]=model[0]
  //  //this.spinner.show();
  //    this.service.getModelsByBrandId(this.change_brand).subscribe((res:any)=>{
  //  //this.spinner.hide();
  //    this.models=res['data']
  //       console.log("All Models" , this.models)
  //    })
  // }

  // changeModels(event) {
  //  this.change_model[0]=event.target.value ;
  //  console.log("search models id" , this.change_model[0])
  // }

  // filter(){
    
  //   let form :any ;
    
  //     form={
  //       category_ids:this.category_change ,
  //       subcategory_ids:this.subcategory_change ,
  //       brand_ids:this.change_brand , 
  //       model_ids:this.change_model , 
  //       page:this.pageIndex,
  //       piece_number:this.vin.nativeElement.value
  //       }
  //       if(this.bool_category==false){
  //         form.category_ids=[]
  //       }
  //       if(this.bool_brand==false) {
  //         form.brand_ids=[]
  //       }
  //     console.log("filter2" ,form)
  //     this.service.filterProduct(form).subscribe((res:any)=>{
  //       this.products=res['data'].products.data

  //       // this.products=[...this.products].reverse()
  //       this.paginator=res['data'].products.last_page*res['data'].products.per_page
  //     console.log("filter" , this.paginator)
  //     })
  // }
 
  // onEditModel(model) {
  //   console.log("model", model)
  //   let dialogRef = this.dialog.open( EditProductComponent, {
  //     data: model,
  //     height: '800px',
  //    });
  //   dialogRef.afterClosed().subscribe( res => {
  //    //location.reload()

  //   //   let form={
  //   //     category_ids:[this.param1] ,
  //   //     subcategory_ids:[] ,
  //   //     brand_ids:[this.param2], 
  //   //     model_ids:[],   
  //   //     page:this.pageIndex,
  //   //     }
    
  //   //     this.service.filterProduct(form).subscribe((res:any)=>{
  //   //       this.products=res['data'].products
  //   //       this.products=[...this.products].reverse()
  //   //       console.log("filter" ,this.products )
  //   //     })
  //   })
  // }

  // onDeleteModel(product) {
  //   console.log("product",product)
  //   this.spinner.show();
  //   this.service.deleteProducts(product.id).subscribe( deleteResponse => {
  //     // if(deleteResponse['status']==true){
  //     //   console.log(deleteResponse);
  //     //   this.spinner.hide();
  //     //   Swal.fire(
  //     //     'نجااااح',
  //     //     'تم حذف المنتج  بنجاح',
  //     //     'success'
  //     //     )
  //     //     this.router.navigate(['/app/products/lists',product.categories[0].id,product.brands[0].id]);
  //     //       let form={
  //     //         category_ids:[product.categories[0].id] ,
  //     //         subcategory_ids:[] ,
  //     //         brand_ids:[product.brands[0].id], 
  //     //         model_ids:[] ,
  //     //         page:this.pageIndex,
  //     //         }
        
  //     //         this.service.filterProduct(form).subscribe((res:any)=>{
  //     //           this.products=res['data'].products
  //     //           this.products=[...this.products].reverse()
  //     //           console.log("filter" ,this.products )
  //     //         })
  //     //     }
  //     // else {
  //     //   Swal.fire(
  //     //     'خطأ',
  //     //     'لم يتم حذف المنتج  ' ,
  //     //     'error'
  //     //     )
  //     // }
     
  //   });

 
     
    
  // }

}
