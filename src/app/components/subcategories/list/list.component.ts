import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { EditSubcategoryComponent } from '../edit-subcategory/edit-subcategory.component';
import { DetailsComponent } from '../details/details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  categories=[];
  subcategories = [];
  category :any ;
  // brands:any = [];
  // x = [];
  // form:FormGroup;
  // baseUrl=environment.baseURL;
  constructor(  private formbuilder:FormBuilder,private dialog:MatDialog,private service:GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    // this.form=this.formbuilder.group({
    //   category_id:['',Validators.required],
    //  })
    this.categoryList()
  }

  categoryList(){
    this.service.allCategories().subscribe((res:any)=>{
      this.categories = res['data']
      console.log("All Categories" ,this.categories)
      this.category=this.categories[0].id 
      this.getAllSubcategories(this.category)
    })
  }

  changeCategory(event) {
    this.category=event.target.value
    this.getAllSubcategories(this.category)
  }

  getAllSubcategories(category){
     this.category=category
     this.service.getSubcategoryByCategoryId(this.category).subscribe((res:any)=>{
     this.subcategories=res['data']
        console.log("All SubCategories" , this.subcategories)
     })
  }
  // categoryList(){
  //   this.service.allCategories().subscribe(x=>{
  //     this.categories = x['data']
  //     this.service.allSubCategories()
    
  //     .subscribe(res=>{
  //     this.spinner.hide()
  //       this.subcategories=res['data'];
  //       const newModels =[]
  //       for( let sub of this.subcategories ) {
  //         console.log(sub.main_specialist_id)
  //             let brandObj = this.categories.find( brand => brand.id ==sub?.main_specialist_id  )
  //             console.log(brandObj)
  //             let newModel = { ...sub, brandName: brandObj?.name }
  //             newModels.push(newModel);
  //           }
  //           this.x = newModels;
  //           console.log(this.subcategories)
  //           console.log(newModels)
  //           console.log(this.x)
  
  //     })
  //   })
  //   this.spinner.show()

  //   // this.service.allCategories().pipe(
  //     // map( models => {
  //     //   const newModels = [];
  //     //   for( let model of models['data'] ) {
  //     //     let brandObj = this.subcategories.find( brand => model.id == brand.id )
  //     //     let newModel = { ...model, brandName: brandObj?.name }
  //     //     newModels.push(newModel);
  //     //   }
  //     //   return newModels;
  //     // })
  //     // map(
  //     //     resData => {

  //     //       const newModels = [];
  //     //       for( let sub of resData['data']) {
  //     //         let brandObj = this.brands.find( brand => model.brand_id == brand.id )
  //     //       }
  //     //       return newModels;
  //     //     }
  //     // )
  //   // )
  //   // .subscribe(newModels =>{
  //   //   console.log(newModels)
  //   //   this.subcategories = 
  //   // })
  // }
  deleteSub(id){
    console.log(id)
    this.spinner.show()
    this.service.deleteSubCategory(id).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجاح',
        'تم حذف الفئه الفرعيه بنجاح',
        'success'
        )
     this.categoryList()
    })
  }
  editSub(sub){
    console.log(sub)
    let dialogRef = this.dialog.open(EditSubcategoryComponent, {
      data:sub,
      height: '650px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.categoryList()
    });
  }
  viewSub(sub){
    console.log(sub)
    let dialogRef = this.dialog.open(DetailsComponent, {
      data:sub,
      height: '650px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.categoryList()
    });
  }
}
