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
   form!:FormGroup; 
   submitted=false;
  constructor( private formbuilder:FormBuilder,
    private spinner:NgxSpinnerService,
    private service:GlobalService,
    private router:Router) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name_ar:['',Validators.required],
      name_en:['',Validators.required],
    })
  }
  submit(){
    this.submitted=true;
    if(this.form.invalid){ return}
    this.spinner.show()
    this.service.addColor(this.form.value).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجااااح',
        'تم إضافة اللون  بنجاح',
        'success'

       
        )
        console.log("colorrrrrr" ,res)
        this.router.navigate(['app/colors/list'])
    })
  }
}
