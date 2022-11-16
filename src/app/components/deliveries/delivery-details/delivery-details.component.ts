import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: any},private router:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    console.log('user')
    console.log("user",this.data)
  }

}
