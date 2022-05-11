import { GlobalService } from './../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  years=[];
    constructor(
    private dialog:MatDialog,
    private spinner:NgxSpinnerService,
    private globalService:GlobalService
    ) { }

  ngOnInit(): void {
     this.allYears()
  }

  allYears(){
    this.spinner.show()
    this.globalService.allYears().subscribe(res=>{
      this.spinner.hide()
      this.years=res['data']
      console.log(this.years)
    })
    
  
    // this.globalService.allYears().pipe(map(res=>res['data'])).subscribe(res=>{
    //   this.spinner.hide()
    //   this.years=res
    //   console.log(res)
    // })
  }
  editYear(year){
  
    let dialogRef = this.dialog.open(EditComponent, {
      data:year,
      height: '650px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.allYears()
    });
  }
  deleteYear(year_id){
    this.spinner.show()
    this.globalService.deleteYear(year_id).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
              'نجاح',
              'تم حذف سنة الصنع بنجاح',
              'success'
            )
            this.allYears()
          })
  }
   
}
