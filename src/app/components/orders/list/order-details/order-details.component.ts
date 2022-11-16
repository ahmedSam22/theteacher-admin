import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { ProductDetailsComponent } from 'src/app/components/car_models/product-details/product-details.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
    
   hideRow=false
   subspecialist=[] ;
   statusType;
   secondStatus=true ;
  //  dataNull=false ; 
   fifthStatus=true ;
   sixStatus=true;
   thirteenSatus=true ;
   fourteenSatus=true ; 
   fifteenStatus=true;
   extendOrder=[];
   alls=[];
   pics=[];
   hide_bands=false ;
   hide_pics=false;
   hide_extend=false;
  constructor(@Inject(MAT_DIALOG_DATA)public data:{data,type},private dialog:MatDialog) { }

  ngOnInit(): void {
    
      this.secondStatus=false ;
   
    this.statusType=this.data.type;
      this.controlSectionShow(this.statusType) 

    this.alls=this.data.data.maintaner.maintainer.specialists
    console.log("Typppppppppppppppppe", this.alls)
    console.log('Single Order Data ');
    console.log("alllllllll" ,this.data.data)
    this.subspecialist=this.data.data['values']
    console.log( "ssssssssssss" ,this.subspecialist)
     this.hide_bands=this.hideEmptyArray(this.subspecialist)
     console.log("BAAAAAANDDDD",this.hide_bands)

     this.extendOrder=this.data.data.request;
     console.log("مددددد الطلب",this.extendOrder)
    this.hide_extend=this.hideEmptyArray(this.extendOrder)
      console.log("EEEEXXXTEEENDDD",this.hide_extend)

     this.pics=this.data.data.images;
     console.log("صور الاوردر", this.pics)
       this.hide_pics=this.hideEmptyArray(this.pics)
       console.log("PIIIIIIIIIIICCCCSSSSSS",this.hide_pics)
    }
    controlSectionShow(statusType){
      if(statusType==0 ){
       this.secondStatus=false;
        this.fifthStatus=false
        this.thirteenSatus=false
      }
    else if(statusType>1&&statusType<=3){
      this.secondStatus=true;
      this.thirteenSatus=false;
      this.fifthStatus=false
      // maintainer info
    }
    else if(statusType==1){
      this.secondStatus=true;
      this.fifthStatus=true
      this.thirteenSatus=false
     }
     else if(statusType<=4){
       this.thirteenSatus=true
      this.fifthStatus=false
      
     }
    // else if(statusType==1){
    //   this.secondStatus=true;
    //   this.fifthStatus=true
    // }
  }
  // controlSectionShow(statusType) {
  //   if(statusType==0){
  //     this.secondStatus=false;
  //     this.sixStatus=false;

  //     this.thirteenSatus=false ;
  //     this.fourteenSatus=false ; 
  //     this.fifteenStatus=false;
  //    }
  //    else if(statusType<4){
  //     this.fifthStatus=false
  //     this.secondStatus=true;
  //     this.sixStatus=false;

  //     this.thirteenSatus=false ;
  //     this.fourteenSatus=false ; 
  //     this.fifteenStatus=false;
  //    }
  //   else if(statusType<6){
  //     this.sixStatus=false;
  //     this.fifthStatus=true;
  //     this.secondStatus=true;

  //     this.thirteenSatus=false ;
  //     this.fourteenSatus=false ; 
  //     this.fifteenStatus=false;
  //   }
  //   else if(statusType==12){
  //     this.thirteenSatus=true ;
  //     this.fourteenSatus=false ; 
  //       this.fifteenStatus=false;
  //   }
  //   else if(statusType==13){
  //     this.thirteenSatus=false ;
  //     this.fourteenSatus=true ; 
  //     this.fifteenStatus=false;
  //   }
  //   else if(statusType==14){
  //     this.thirteenSatus=false ;
  //     this.fourteenSatus=false ; 
  //     this.fifteenStatus=true;
  //   }
  //   else {
  //      this.secondStatus=true;
  //      this.fifthStatus=true;
  //      this.sixStatus=true ;

  //       this.thirteenSatus=false ;
  //       this.fourteenSatus=false ; 
  //      this.fifteenStatus=false;
      
  //   }
  // }
 hideEmptyArray(emp){
   
    if(emp.length===0 ){
     return true ;
   }
   else {
     return false ;
    }
  
 }
}
