import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { MaintainersDetailsComponent } from '../../maintainers/maintainers-details/maintainers-details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  type=1;
  userActive=1;
  public selectedRole = this.route.snapshot.paramMap.get('role');
  delivery;
  constructor( 
    public route: ActivatedRoute,
    private spinner:NgxSpinnerService,
    private service:GlobalService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getDeliveries(this.type)
  }
  getDeliveries(active_status){
    this.spinner.show()
    this.service.getDeliveries(active_status).pipe(map(res=>res['data'])).subscribe((response:any)=>{
      console.log(response)
      this.delivery = response
    this.spinner.hide()
    })
  }

  getOrders(type){
    this.getDeliveries(type)
    this.type=type

  }




  activeFamily(user_id){
    this.service.changeDeliveriesStatus(user_id,1).subscribe(res=>{
      Swal.fire(
        'نجاح',
        'تم إلغاء الحظر بنجاح   ',
        'success'
      )
      this.getOrders(this.type)
    })
  }
        
  refuseFamily(user_id){
    // this.service.deleteUser(user_id).subscribe(res=>{
    //   Swal.fire(
    //     'نجاح',
    //     'تم  الحذف بنجاح   ',
    //     'success'
    //   )
    //   this.getOrders(this.type)
    // })
  }
  blockFamily(user_id){

    this.service.changeDeliveriesStatus(user_id,0).subscribe(res=>{
      Swal.fire(
        'نجاح',
        'تم الحظر بنجاح   ',
        'success'
      )
      this.getOrders(this.type)
    })
  }


  userDetails(user){
    let dialogRef = this.dialog.open(MaintainersDetailsComponent, {
      data:user,
      height: '500px',
      width: '600px',
    });
  }

}

