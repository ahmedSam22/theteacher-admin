import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { UserDetailsComponent } from '../../users/user-details/user-details.component';
import { MaintainersDetailsComponent } from '../maintainers-details/maintainers-details.component';
import Swal from 'sweetalert2';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  type=1;
  userActive=1;
  public selectedRole = this.route.snapshot.paramMap.get('role');
  users;
  constructor( 
    public route: ActivatedRoute,
    private spinner:NgxSpinnerService,
    private service:GlobalService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getMaintainers(this.type)
  }
  getMaintainers(active_status){
    this.spinner.show()
    this.service.getMaintainers(active_status).pipe(map(res=>res['data'])).subscribe((response:any)=>{
      console.log(response)
      this.users = response
    this.spinner.hide()
    })
  }

  getOrders(type){
    this.getMaintainers(type)
    this.type=type

  }
  editmaintainer(user){
    console.log(user)
    let dialogRef = this.dialog.open(EditComponent, {
      data:user,
      height: '650px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMaintainers(this.type)
    });
  }




  activeFamily(user_id){
    this.service.changeMaintainerStatus(user_id,1).subscribe(res=>{
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

    this.service.changeMaintainerStatus(user_id,0).subscribe(res=>{
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

