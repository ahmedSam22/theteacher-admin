import   Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cities;
  baseUrl=environment.baseURL;
  constructor(
    private dialog:MatDialog,
    private spinner:NgxSpinnerService,
    private service:GlobalService
    ) { }

  ngOnInit(): void {
    this.cityList()
  }

  cityList(){
    this.spinner.show()
    this.service.allCities().pipe(map(res=>res['data'])).subscribe(res=>{
      this.spinner.hide()
      console.log('res')
      console.log(res)
      this.cities=res
    })
  }


  deleteApp(brand_id){
    Swal.fire({
      title: 'هل أنت متأكد؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، قم بالحذف',
      cancelButtonText:'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
          this.service.deleteCity(brand_id).subscribe(res=>{
          Swal.fire(
            'نجاح',
            'تم حذف المدينة بنجاح',
            'success'
            )
            this.cityList()
          })
        }
    })
  }



  // viewApp(){
  //   let dialogRef = this.dialog.open(AppInfoComponent, {
  //     height: '600px',
  //     width: '600px',
  //   });
  // }
}
