import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { ConnectionServiceModule } from 'ng-connection-service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class editComponentTaxes implements OnInit {
  form!:FormGroup;
  taxes;
  submitted;
  vat=0; 
  app=0 ;
  constructor(  private formbuilder:FormBuilder,private spinner:NgxSpinnerService,
    private service:GlobalService,
    private router:Router) { }

  ngOnInit(): void { 
  
    this.service.AllTaxes().subscribe(res=>{
      this.taxes=res['data'];
      console.log("Taxes" , this.taxes)
      this.vat=this.taxes.vat_precent ;
      this.app=this.taxes.app_precent

      console.log("Vat" , this.vat)
      console.log("App" , this.app)
      this.form = new FormGroup({
        'vat_precent': new FormControl(this.vat,Validators.required),
        'app_precent': new FormControl(this.app,Validators.required)
      });
     });
     
     
    //   this.form=this.formbuilder.group({
    //     vat_precent:[this.vat,Validators.required],
    //     app_precent:[this.app,Validators.required]
    // });
   

    //console.log("vaaaaaat",this.form.value.vat_precent)
  }
  allTaxes(){
    
  }
  submit(){
    
    this.spinner.show()
    this.service.editTaxes(this.form.value).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجااااح',
        'تم إضافة الضريبة  بنجاح',
        'success'
        )
        //this.router.navigate(['/home'])
        console.log(res)
    })
  }
}
