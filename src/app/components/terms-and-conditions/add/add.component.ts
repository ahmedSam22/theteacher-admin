import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
//import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  myform!:FormGroup ;
  repFiles: File[] = [];
  terms: File[] = [];
  privacy: File[] = [];
  submitted;
  defaultValue;
  termfilename ='';
  privacyfilename='' ;
  responsefilename='';
  termcheck=false;
  respcheck=false ;
  privcheck=false;
  result;
  x;
  constructor( private formbuilder:FormBuilder, private spinner:NgxSpinnerService,
    private service:GlobalService,
    private router:Router) { }

  ngOnInit(): void {
    this.termcheck=false; this.respcheck=false ; this.privcheck=false;
    this.service.getAllFiles().subscribe((res:any)=>{
    console.log("resssss",res)
      this.result=res['data']
      this.terms=this.result.termsPath
      this.repFiles=this.result.responsiblePath
      this.privacy=this.result.privacyPath
     
      if(this.terms.length!=0||this.repFiles.length!=0||this.privacy.length!=0) {
        this.termfilename = 'terms and conditions.pdf';
        this.privacyfilename='privacy policy.pdf' ;
        this.responsefilename='responsibility policy.pdf';
      }
      else{
        console.log("this.terms",this.terms)
        console.log("this.repFiles" , this.repFiles)
        console.log("this.privacy",this.privacy)
      }
      this.myform=this.formbuilder.group({
        terms:[this.result.termsPath,Validators.required],
        responsible:[this.result.responsiblePath,Validators.required],
        privacy:[this.result.privacyPath,Validators.required],
          })  
     })
    
//  this.x= (<HTMLInputElement>document.getElementById('getTermsFile')).files[0] ;
//      this.x=this.terms
  }
  termsChange(event) {
    this.terms=event.target.files
    console.log("files" ,this.terms[0]);
    this.termcheck=true;
  }
  reponsibilityChange(event) {
    this.repFiles=event.target.files
    console.log("files" ,this.repFiles[0]);
    this.respcheck=true ;
  }
  privacyChange(event){
    this.privacy=event.target.files
   console.log("files" ,this.privacy[0]);
    this.privcheck=true ;
  }
  onSubmitTerms(){
    let fo 
    if(this.termcheck==true) {
      fo = {
        terms:this.terms[0] ,
      } 
    console.log("ffffffffoooooooo1", fo)
   } 
   else {
    fo = {
      terms:this.result.termsPath,
    }
    console.log("ffffffffoooooooo2", fo)
   }
    this.spinner.show()
    this.service.addTermsFiles(fo).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجااااح',
        'تم إضافة ملف الشروط والأحكام بنجاح',
        'success'
        )
        console.log("termmmmmms resssssss" ,res)
         
    })
  
  }
  onSubmitPrivacy(){
    let fo 
    if(this.privcheck==true) {
      fo = {
        privacy:this.privacy[0],
      } 
    console.log("ffffffffoooooooo1", fo)
   } 
   else {
    fo = {
      privacy:this.result.privacyPath,
    }
    console.log("ffffffffoooooooo2", fo)
   }
     this.spinner.show()
    this.service.addTermsFiles(fo).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجااااح',
        'تم إضافة سياسة الخصوصية بنجاح',
        'success'
        )
        console.log("termmmmmms resssssss" ,res)
         
    })
  
  }
  onSubmitResp(){
    let fo 
    if(this.respcheck==true) {
     fo = {
        responsible:this.repFiles[0],
      } 
    console.log("ffffffffoooooooo1", fo)
   } 
   else {
    fo = {
      responsible:this.result.responsiblePath,
    }
    console.log("ffffffffoooooooo2", fo)
   }
  
  
 
    this.spinner.show()
    this.service.addTermsFiles(fo).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجااااح',
        'تم إضافة ملف إخلاء المسؤولية بنجاح',
        'success'
        )
        console.log("termmmmmms resssssss" ,res)
         
    })
  
  }
  onSubmit(){
  //   let fo 
  //   if(this.termcheck==true||this.respcheck==true ||this.privcheck==true) {
     
  //     fo = {
  //       terms:this.terms[0] ,
  //       responsible:this.repFiles[0],
  //       privacy:this.privacy[0],
  //     } 
  //   console.log("ffffffffoooooooo1", fo)
  //  } 
  //  else {
  //   fo = {
  //     terms:this.result.termsPath,
  //     responsible:this.result.responsiblePath,
  //     privacy:this.result.privacyPath,
  //   }
  //   console.log("ffffffffoooooooo2", fo)
  //  }
  
  
 
  //   this.spinner.show()
  //   this.service.addTermsFiles(fo).subscribe(res=>{
  //     this.spinner.hide()
  //     Swal.fire(
  //       'نجااااح',
  //       'تم إضافة الملفات بنجاح',
  //       'success'
  //       )
  //       console.log("termmmmmms resssssss" ,res)
         
  //   })
  
  }
}
