import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(  private service:GlobalService,
    private spinner:NgxSpinnerService,    private router:Router,    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,) { }

  ngOnInit(): void {
    console.log(this.data)
  }
  files: File[] = [];

  onSelect(event) {
    console.log(event.addedFiles[0]);
    this.files=[]
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  submit(){
    let form = {
      banner_id:this.data.id,

      image:this.files[0]
     }
     this.spinner.show()
     this.service.editBanner(form).subscribe(res=>{
     this.spinner.hide()
     Swal.fire(
         'نجاح',
         'تم تعديل البانر بنجاح',
         'success'
       )
       this.router.navigate(['/app/banners/list'])
      this.dialog.closeAll()

     })
  }
}
