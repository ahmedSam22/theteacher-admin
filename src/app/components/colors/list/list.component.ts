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
    this.service.deleteColor(color_id).subscribe(res=>{
      Swal.fire(
        'نجاح',
        'تم حذف اللون بنجاح',
        'success'
        )
        this.colorList();
      })
   }
  
  
  
 
  
  // cityList(){
  //   this.spinner.show()
  //   this.service.allCities().pipe(map(res=>res['data'])).subscribe(res=>{
  //     this.spinner.hide()
  //     console.log('res')
  //     console.log(res)
  //     this.cities=res
  //   })
  // }
 

 
 
}
