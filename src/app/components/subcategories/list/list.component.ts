import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { EditSubcategoryComponent } from '../edit-subcategory/edit-subcategory.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  categories;
  baseUrl=environment.baseURL;
  constructor(private dialog:MatDialog,private service:GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.categoryList()
  }

  categoryList(){
    this.spinner.show()
    this.service.allSubCategories().pipe(map(res=>res['subcategories'])).subscribe(res=>{
    this.spinner.hide()
    console.log('res')
      console.log(res)
      this.categories=res
    })
  }
  deleteApp(category_id){
    this.spinner.show()
    this.service.deleteSubCategory(category_id).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجاح',
        'تم حذف الفئة بنجاح',
        'success'
        )
        this.categoryList()
    })
  }
  editPackage(category){
    let dialogRef = this.dialog.open(EditSubcategoryComponent, {
      data:category,
      height: '650px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.categoryList()
    });
  }
}
