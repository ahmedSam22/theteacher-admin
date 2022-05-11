import { GlobalService } from '../../../services/global.service';
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

  banners;
  constructor(private dialog:MatDialog,private spinner:NgxSpinnerService,private globalService:GlobalService) { }

  ngOnInit(): void {
    this.allBanners()
  }

  allBanners(){
    this.spinner.show()
    this.globalService.allBanners().pipe(map(res=>res['data'])).subscribe(res=>{
      this.spinner.hide()
      this.banners=res
     
      console.log(res)
    })
  }


  editBanner(city){
    let dialogRef = this.dialog.open(EditComponent, {
      data:city,
      height: '650px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.allBanners()
    });
  }
  deleteBanner(banner_id){
    this.spinner.show()
    this.globalService.deleteBanner(banner_id).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
              'نجاح',
              'تم حذف البانر بنجاح',
              'success'
            )
            this.allBanners()
          })
  }
  
}
