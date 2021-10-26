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

  brands;
  baseUrl=environment.baseURL;
  countries;
  constructor(
    private dialog:MatDialog,
    private spinner:NgxSpinnerService,
    private service:GlobalService
    ) { }

  ngOnInit(): void {
    this.countryList()
  }

  countryList(){
    // this.spinner.show()
    // this.service.allCountries().pipe(map(res=>res['data'])).subscribe(res=>{
    //   this.spinner.hide()
    //   console.log('res')
    //   console.log(res)
    //   this.countries=res
    // })
  }


  deleteApp(brand_id){
    // Swal.fire({
    //   title: 'هل أنت متأكد؟',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'نعم، قم بالحذف',
    //   cancelButtonText:'إلغاء'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //       this.service.deleteCountry(brand_id).subscribe(res=>{
    //       Swal.fire(
    //         'نجاح',
    //         'تم حذف الدولة بنجاح',
    //         'success'
    //         )
    //         this.countryList()
    //       })
    //     }
    // })
  }



  // viewApp(){
  //   let dialogRef = this.dialog.open(AppInfoComponent, {
  //     height: '600px',
  //     width: '600px',
  //   });
  // }
}
