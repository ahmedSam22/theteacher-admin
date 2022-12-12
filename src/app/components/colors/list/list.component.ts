import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  colors=[];
  editable = false;
  addButton = true;
  constructor(  private spinner:NgxSpinnerService,
    private service:GlobalService,
    private router:Router) { }

  ngOnInit(): void {
    this.colorList() ;
  }
  colorList() {
    this.spinner.show()
    this.service.allColors().subscribe((res)=>{
    this.spinner.hide()
    this.colors=res['data'];
    console.log("collllllor" , res['data']);
  });
 
  }
   deleteColor(color_id){
   
   this.spinner.show();
   console.log(color_id);
   
    this.service.deleteColor(color_id).subscribe(res=>{
      Swal.fire(
        'نجاح',
        'تم حذف اللون بنجاح',
        'success'
        )
        this.colorList();
      })
   }
  
  
  addColor(color){
    let body = {
      hexcode : color
    }
    this.service.addColor(body).subscribe((res:any)=>{
      this.spinner.hide()
      if(res.status === true){
         Swal.fire(
        'نجااااح',
        'تم إضافة اللون  بنجاح',
        'success'
        )
        this.colorList() 
      }
     
    })
  }
 
 

 editColor(colorId , color)
 {
  let body = {
    color_id : colorId,
    hexcode : color
  }
  this.service.editColor(body).subscribe((res:any)=>{
    this.spinner.hide()
    if(res.status === true){
       Swal.fire(
      'نجااااح',
      'تم إضافة اللون  بنجاح',
      'success'
      )
      this.colorList() 
    }
   
  })
 }
}
