import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  form:FormGroup;
  typeval;
  categories;
  submitted:boolean=false
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router
    ) { }
    
  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name :['',Validators.required],
      category_id:['',Validators.required],
     })
    this.categoryList()
  }
 

  categoryList(){
    this.spinner.show()
    this.service.allCategories().pipe(map(res=>res['data'])).subscribe(res=>{
    this.spinner.hide()
    this.categories=res 
    })
  }

  get f() {return this.form.controls}
  submit(){
    this.submitted=true
    this.spinner.show()
     this.service.addSubCategory(this.form.value).subscribe(res=>{
    this.spinner.hide()
    if(res['status']==true) {
      Swal.fire(
        'نجاح',
        `${res['message']}`,
        'success'
      )
      console.log("Sub Category",res)
      this.router.navigate(['/app/sub/list', this.form.value.category_id])
    }
    else {
      let error = res['errors']
      Swal.fire(
        'خطأ',
         `${error[0]}`,
        'error'
      )
    }
    })
  }

  

}
