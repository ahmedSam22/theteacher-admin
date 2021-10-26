import { GlobalService } from './../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  occassions;
  constructor(
    private dialog:MatDialog,
    private spinner:NgxSpinnerService,
    private globalService:GlobalService
    ) { }

  ngOnInit(): void {
    this.allProducts()
  }

  allProducts(){
    this.spinner.show()
    this.globalService.allOccasions().pipe(map(res=>res['data'])).subscribe(res=>{
      this.spinner.hide()
      this.occassions=res
      console.log(res)
    })
  }
  activeProduct(product_id){
    // this.spinner.show()
    // this.globalService.activeProduct(product_id,1).subscribe(res=>{
    //   this.spinner.hide()
    //   Swal.fire(
    //           'نجاح',
    //           'تم قبول المنتج بنجاح',
    //           'success'
    //         )
    //         this.allProducts()
    //       })
  }
  refuseProduct(product_id){
    // this.spinner.show()
    // this.globalService.activeProduct(product_id,2).subscribe(res=>{
    //   this.spinner.hide()
    //   Swal.fire(
    //           'نجاح',
    //           'تم قبول المنتج بنجاح',
    //           'success'
    //         )
    //         this.allProducts()
    //       })
  }
  // productDetails(order){
  //   let dialogRef = this.dialog.open(ProductDetailsComponent, {
  //     data:order,
  //     height: '600px',
  //     width: '600px',
  //   });
  // }

  deleteColor(occassion_id){
    this.spinner.show()
    this.globalService.deleteOccasions(occassion_id).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
              'نجاح',
              'تم حذف المناسبة بنجاح',
              'success'
            )
            this.allProducts()
          })
  }
}
