import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { ProviderDetailsComponent } from '../provider-details/provider-details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  type=0;
  public selectedRole = this.route.snapshot.paramMap.get('role');
  public users = [
    {
      
    }
  ]
  constructor( 
    public route: ActivatedRoute,
    private spinner:NgxSpinnerService,
    private service:GlobalService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getUsers(0)
  }
  getUsers(status_id){
    this.spinner.show()
    this.service.allProviders(status_id).pipe(map(res=>res['data'])).subscribe((response:any)=>{
      console.log(response)
      this.users = response
    this.spinner.hide()
    })
  }

  getOrders(type){
    this.type=type
    this.getUsers(type)
  }




  activeFamily(user_id){
    this.service.changeUserStatus(user_id,1).subscribe(res=>{
      Swal.fire(
        'نجاح',
        'تم تنشيط مقدم الخدمة بنجاح   ',
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
    this.service.changeUserStatus(user_id,2).subscribe(res=>{
      Swal.fire(
        'نجاح',
        'تم الحظر بنجاح   ',
        'success'
      )
      this.getOrders(this.type)
    })
  }

  providerDetails(user){
    let dialogRef = this.dialog.open(ProviderDetailsComponent, {
      data:user,
      height: '650px',
      width: '600px',
    });
  }
}
