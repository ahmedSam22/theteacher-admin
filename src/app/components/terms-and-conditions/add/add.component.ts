import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  myform!:FormGroup ;
  repFiles: File[] = [];
  terms: File[] = [];
  submitted;
  defaultValue;
  termcheck=false;
  respcheck=false ;
  constructor( private formbuilder:FormBuilder, private spinner:NgxSpinnerService,
    private service:GlobalService,
    private router:Router) { }

  ngOnInit(): void {
    if(this.termcheck==true&&this.respcheck==true){ 
      this.myform=this.formbuilder.group({
        terms:[this.terms,Validators.required],
        responsible:[this.repFiles,Validators.required],
      })
    }
    else {
      this.myform=this.formbuilder.group({
        terms:['',Validators.required],
        responsible:['',Validators.required],
      })
    }
   //this.form.controls.proof.patchValue(this.defaultValue);
 
  }
  termsChange(event) {
    this.termcheck=true;
    this.terms=event.target.files
    console.log("files" ,this.terms[0]);
  }
  reponsibilityChange(event) {
    this.respcheck=true ;
    this.repFiles=event.target.files
    console.log("files" ,this.repFiles[0]);
  }
  submit(){
    if(this.termcheck==true&&this.respcheck==true){ 
    this.spinner.show()
    this.service.addTermsFiles(this.myform.value).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجااااح',
        'تم إضافة ملفات كلا من شروط الأحكام و إخلاء المسؤولية  بنجاح',
        'success'

       
        )
        console.log("termmmmmms" ,res)
        //this.router.navigate(['app/colors/list'])
    })
  }
  }
}
