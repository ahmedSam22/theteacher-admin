import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-addprice',
  templateUrl: './addprice.component.html',
  styleUrls: ['./addprice.component.scss']
})
export class AddpriceComponent implements OnInit {
  form:FormGroup;
  
  constructor( private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
   
    this.form=this.formbuilder.group({
      price:['',Validators.required],
      price_id:[this.data,Validators.required],
    })
  }
  submit(){
    this.spinner.show()
    this.service.editPrices(this.form.value).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجااااح',
        'تم تعديل السعر بنجاح',
        'success'
        )
        this.dialog.closeAll()
        console.log("resssssss" , res)
        //this.router.navigate(['/app/prices/list'])
    })
  }
}
