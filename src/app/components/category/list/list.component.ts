import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  flag:boolean=false
  categories;
  baseUrl=environment.baseURL;
  constructor(private dialog:MatDialog,private service:GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.categoryList()
  }

  categoryList(){
    this.spinner.show()
    this.service.allCategories().pipe(map(res=>res['data'])).subscribe(res=>{
    this.spinner.hide()
    console.log('res')
      console.log(res)
      this.categories=[...res].reverse()
    })
  }
  deleteApp(category_id){
    console.log(category_id)
    this.spinner.show()
    this.service.deleteCategory(category_id).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجاح',
        'تم حذف القسم الرئيسي بنجاح',
        'success'
        )
        this.categoryList()
    })
  }
  editPackage(category){
    let dialogRef = this.dialog.open(EditCategoryComponent, {
      data:category,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.categoryList()
    });
  }
  viewCat(cat){
    console.log(cat)
    let dialogRef = this.dialog.open(CategoryDetailsComponent, {
      data:cat,
      height: '500px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.categoryList()
    });
  }
}
