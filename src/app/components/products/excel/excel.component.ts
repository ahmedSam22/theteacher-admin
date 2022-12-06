import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { HttpClient } from '@angular/common/http';
import * as saveAs from 'file-saver';
 
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent implements OnInit {

  constructor(private http:HttpClient,private route: ActivatedRoute,private dialog:MatDialog,private spinner:NgxSpinnerService,private service: GlobalService , private router:Router) {}

  ngOnInit(): void {
  }

  uploadExcel(file: File[]){
    this.spinner.show()
    this.service.uploadExcelFile(file).subscribe((res:any)=> {
      console.log("Upload File ",res)
      Swal.fire({
        title: 'success !',
        text: 'Products Uploaded Successfully',
        icon: 'success',
        confirmButtonColor: '#4AB673',
        }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        };
      });
      this.spinner.hide()
    })

  }

  downloadExcel() {
    this.spinner.show()
    this.http.get(`${environment.endpoint}/admin/products/export-excel`, { responseType: 'blob' }).subscribe(
        (response:any) => {
            var blob = new Blob([response], { type: 'text/plain' });
            var fileURL = window.URL.createObjectURL(blob);
              saveAs(blob, `example-file.xlsx`);
            this.spinner.hide()
            this.dialog.closeAll()
        },
        (e:any) => {
          console.log(e)
          this.spinner.hide()
         }
    );
  }
}
