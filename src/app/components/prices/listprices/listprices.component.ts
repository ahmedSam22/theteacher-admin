import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import { AddpriceComponent } from '../addprice/addprice.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-listprices',
  templateUrl: './listprices.component.html',
  styleUrls: ['./listprices.component.scss']
})
export class ListpricesComponent implements OnInit {

  prices=[];
  constructor(  private spinner:NgxSpinnerService,
    private service:GlobalService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.priceList() ;
  }
  priceList() {
    this.spinner.show()
    this.service.allPrices().subscribe((res)=>{
    this.spinner.hide()
    this.prices=res['data'];
    console.log("pricccccce" , res['data']);
  });
  
  }
  editPrice(id){
    console.log("iddddddddd" ,id)
    let dialogRef = this.dialog.open(AddpriceComponent, {
      data:id,
      height: '650px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.priceList()
    });
    
  }
  
  

}
