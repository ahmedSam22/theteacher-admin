import { GlobalService } from './../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  products;
  constructor(private dialog:MatDialog,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    // this.allProducts()
  }

  allProducts(){
    // this.spinner.show()
    // this.globalService.allProducts().pipe(map(res=>res['data'])).subscribe(res=>{
    //   this.spinner.hide()
    //   this.products=res
    //   console.log(res)
    // })
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
  productDetails(order){
    let dialogRef = this.dialog.open(ProductDetailsComponent, {
      data:order,
      height: '600px',
      width: '600px',
    });
  }
}
