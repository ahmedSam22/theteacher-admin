import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: any},private router:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    console.log('user')
    console.log(this.data)
  }

  userRelatedOrder(user_id){
    this.dialog.closeAll()
    this.router.navigate(['/app/users//user-orders',user_id])
  }
}


// [routerLink]="['/app/users//user-orders',data.id]"