import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(  private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,) { }

  ngOnInit(): void {
    console.log(this.data)
  }
    deletex(id){
      this.spinner.show()
      this.service.deletesubcatvalue(id).subscribe(res=>{
        Swal.fire(
          'نجاح',
          'تم حذف الخدمة بنجاح',
          'success'
          )
      this.spinner.hide()
      this.dialog.closeAll()
      this.router.navigate(['/app/sub/list'])
          
       
        })
    }
}
