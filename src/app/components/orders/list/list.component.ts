import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProviderDetailsComponent } from '../../brands/provider-details/provider-details.component';
import { UserDetailsComponent } from '../../users/user-details/user-details.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  orders;
  type='0';
  constructor(private dialog:MatDialog,private service:GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.orderList(this.type)

  }

  orderList(type){
   // this.spinner.show()
    this.service.allOrders(type).pipe(map(res=>res['data'])).subscribe(res=>{
      this.spinner.hide()
      this.orders=res.data
      // for (let i = 0; i < this.orders.length; i++) {
      //   const maintainer_id = this.orders[i].maintaner.id;
      //   const main_specialist_id = this.orders[i].main_specialist_id
      //   const user_id = this.orders[i].user.id;
      //   this.service.getCategoryById(7).subscribe(res=>{
      //     console.log(res['data'].name)
      //     console.log(this.orders[i])
      //   })
      //   // console.log(element)
        
      // }
      console.log("orderrrrrrs",this.orders)
    })
  }
  deleteApp(){
    Swal.fire(
      'نجاح',
      'تم حذف التطبيق بنجاح',
      'success'
      )
  }
  orderDetails(order,type){
    this.dialog.closeAll()
    let dialogRef = this.dialog.open(OrderDetailsComponent, {
      // data:order,
      data: {data:order, type:type},
      height: '800px',
      width: '800px',
    });
  }
  getOrders(x){
    this.type=x
    this.orderList(x)
  }



  providerDetails(user){
    let dialogRef = this.dialog.open(ProviderDetailsComponent, {
      data:user,
      height: '800px',
      width: '800px',
    });
  }

  userDetails(user){
    let dialogRef = this.dialog.open(UserDetailsComponent, {
      data:user,
      height: '800px',
      width: '800px',
    });
  }
}
