import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { ProductDetailsComponent } from 'src/app/components/car_models/product-details/product-details.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
    
  constructor(@Inject(MAT_DIALOG_DATA)public data:{data,type},private dialog:MatDialog) { }

  ngOnInit(): void {
   console.log("order list ", this.data)
  }
   
}
