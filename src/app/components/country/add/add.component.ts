import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  form:FormGroup;
  categories;
  submitted=false;
  constructor(
    private formbuilder:FormBuilder,
    private spinner:NgxSpinnerService,
    private service:GlobalService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      country:['',Validators.required],
    })
  }

  get f(){return this.form.controls}

  // allCategories(){
  //   this.spinner.show()
  //   this.service.allCategories().pipe(map(res=>res['data'])).subscribe(res=>{
  //     this.spinner.hide()
  //     console.log('categories')
  //     console.log(res)
  //     this.categories=res
  //   })
  // }

  submit(){
    this.submitted=true;
    if(this.form.invalid){ return}
    this.spinner.show()
    this.service.addCountry(this.form.value).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
        'نجااااح',
        'تم إضافة الدولة  بنجاح',
        'success'
        )
        this.router.navigate(['/app/country/list'])
    })
  }

}
