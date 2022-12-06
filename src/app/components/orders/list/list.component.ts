import   Swal  from 'sweetalert2';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProviderDetailsComponent } from '../../brands/provider-details/provider-details.component';
import { UserDetailsComponent } from '../../users/user-details/user-details.component';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() pageIndex: number
  orders:any =[];
  type:any ;
  paginator=100;
  constructor(private dialog:MatDialog,private service:GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.pageIndex=0 ;
    this.type='0'
    this.getOrders('0','0',1)
  }
  onPaginateChange(event){
    this.pageIndex=event.pageIndex+1
    console.log(JSON.stringify(this.pageIndex) , this.pageIndex );
    let status = localStorage.getItem('status_id') ;
    let type = localStorage.getItem('type') ;
    this.getOrders(type,status,this.pageIndex)
  }

  getOrders(type,status_id,page_index){
    localStorage.setItem("status_id",status_id)
    localStorage.setItem("type",type)
    this.orders =[]
      this.service.orders(type,page_index).pipe(map(res=>res['data'])).subscribe((response:any)=>{ 
        console.log("Response",type, response)

        this.paginator=response.per_page*response.last_page
        
        response.data.forEach(element => {
          if(status_id=='0' && element.status_id=='0' ){
          this.type='0'
          this.orders.push(element ) 
          console.log("Placed Orders",this.orders)
        }
        if(status_id=='1' && element.status_id=='1' ){
          this.type='1' 
          this.orders.push(element ) 
          console.log("In Preperation Orders",this.orders)
        }
        if(status_id=='2' && element.status_id=='2' ){
          this.type='2'
          this.orders.push(element ) 
          console.log(" Within Delivery Orders",this.orders)
        }
        if(status_id=='3' && element.status_id=='3' ){
          this.type='3'
          this.orders.push(element ) 
          console.log(" Delivered Orders",this.orders )
        }
        if(status_id=='4' && element.status_id=='4' ){
          this.type='4'
          this.orders.push(element ) 
          console.log(" Cancelled Orders",this.orders)
        }
       });
       
       
      
      })
   
  }

  mangeOrder( order_id, status_id){
    let f ={
      order_id : order_id,
      status_id: status_id
    }
    this.service.manageOrders(f).subscribe((res:any)=>{
      console.log("manage order" ,res)
      if (res.status==true){
        Swal.fire(
          `Success` , 
          `${res.message}`,
          `success`
        )
      }
      else {
        Swal.fire(
          `Fail` , 
          `${res.errors[0]}`,
          `error`
        )
      }
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
      data: {data:order, type:type},
      height: '800px',
      width: '800px',
    });
  }
  // getOrders(x){
  //   this.type=x
  //   this.orderList(x)
  // }



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
