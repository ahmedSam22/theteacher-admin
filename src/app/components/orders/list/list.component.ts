import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  orders;
  type=0;
  constructor(private dialog:MatDialog,private service:GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.orderList(this.type)
  }

  orderList(type){
    this.spinner.show()
    this.service.allOrders(type).pipe(map(res=>res['orders'])).subscribe(res=>{
      this.spinner.hide()
      this.orders=res
    })
  }
  deleteApp(){
    Swal.fire(
      'نجاح',
      'تم حذف التطبيق بنجاح',
      'success'
      )
  }
  orderDetails(order){
    let dialogRef = this.dialog.open(OrderDetailsComponent, {
      data:order,
      height: '600px',
      width: '600px',
    });
  }
  getOrders(progress){
    this.type=progress
    this.orderList(progress)
  }
}
