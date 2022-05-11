import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class editComponentTaxes implements OnInit {
  form!:FormGroup;
   taxes={}
  submitted;

  constructor(  private formbuilder:FormBuilder,private spinner:NgxSpinnerService,
    private service:GlobalService,
    private router:Router) { }

  ngOnInit(): void {
    this.service.AllTaxes().subscribe(res=>{
      this.taxes=res['data'];
      console.log("Taxes" , this.taxes )
     });
 
      this.form=this.formbuilder.group({
        vat_precent:['',Validators.required],
        app_precent:['',Validators.required]
    });
  
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
    })
  }
}
