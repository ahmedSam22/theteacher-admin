import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { EditProductComponent } from '../edit-product/edit-product.component';

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
  constructor(private dialog:MatDialog,private spinner:NgxSpinnerService,private service: GlobalService) { }

  ngOnInit(): void {
   this.categoryList();
   this.getAllBrands() ;

  }

  categoryList(){
    this.service.allCategories().subscribe((res:any)=>{
      this.categories = res['data']
      console.log("All Categories" ,this.categories)
      this.category_change[0]=this.categories[0].id 
      this.getAllSubcategories(this.category_change)
    })
  }

  changeCategory(event) {
    this.category_change[0]=event.target.value
    this.getAllSubcategories(this.category_change)
    console.log("search category id",this.category_change[0])
  }

  getAllSubcategories(category){
    this.category_change[0]=category[0]
    this.service.getSubcategoryByCategoryId(this.category_change).subscribe((res:any)=>{
     this.subcategories=res['data']
        console.log("All SubCategories" , this.subcategories)
     })
  }

  changeSubcategory(event){
  this.subcategory_change[0]=event.target.value
  console.log("search subcategory id",this.subcategory_change[0])
  }

  getAllBrands(){
    this.service.getBrands().subscribe((res:any)=>{ 
      this.brands=res['data'] ;
      console.log("All Brands" , this.brands)
      this.change_brand[0]= this.brands[0].id ;
      this.getAllModels(this.change_brand);
    })
  }

  changeBrands(event) {
    this.change_brand[0]=event.target.value
    this.getAllModels(this.change_brand)
    console.log("search brands id" , this.change_brand[0])
  }

  getAllModels(model){
    this.change_brand[0]=model[0]
   //this.spinner.show();
     this.service.getModelsByBrandId(this.change_brand).subscribe((res:any)=>{
   //this.spinner.hide();
     this.models=res['data']
        console.log("All Models" , this.models)
     })
  }

  changeModels(event) {
   this.change_model[0]=event.target.value ;
   console.log("search models id" , this.change_model[0])
  }

  filter(){
    let form={
      category_ids:this.category_change ,
      subcategory_ids:this.subcategory_change ,
      brand_ids:this.change_brand , 
      model_ids:this.change_model   
      }

      this.service.filterProduct(form).subscribe((res:any)=>{
        this.products=res['data'].products
        console.log("filter" ,this.products )
      })
  }
 
  onEditModel(model) {
    let dialogRef = this.dialog.open( EditProductComponent, {
      data: model,
      height: '800px',
     });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
      this.getAllBrands() 
    })
  }

  onDeleteModel(product_id) {
    this.spinner.show();
    this.service.deleteProducts(product_id).subscribe( deleteResponse => {
      console.log(deleteResponse);
      this.spinner.hide();
      Swal.fire(
        'نجااااح',
        'تم حذف المنتج  بنجاح',
        'success'
        )
    });
 
    location.reload()
  }
}
