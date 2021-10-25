import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  
  type=1;
  public selectedRole = this.route.snapshot.paramMap.get('role');
  public users = [
    {
      
    }
  ]
  constructor( public route: ActivatedRoute,private spinner:NgxSpinnerService,private service:GlobalService) { }

  ngOnInit(): void {
    // this.getUsers(1)
  }
  getUsers(status_id){
    this.spinner.show()
    // this.selectedRole = role
    this.service.allUsers(status_id).subscribe((response:any)=>{
      console.log(response.data)
      this.users = response.data
    this.spinner.hide()
    })
  }

  getOrders(type){
    this.type=type
    // this.getUsers(type)
  }




  activeFamily(user_id){
    this.service.unblockUser(user_id).subscribe(res=>{
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
    // this.service.blockUser(user_id).subscribe(res=>{
    //   Swal.fire(
    //     'نجاح',
    //     'تم الحظر بنجاح   ',
    //     'success'
    //   )
    //   this.getOrders(this.type)
    // })
  }




}

