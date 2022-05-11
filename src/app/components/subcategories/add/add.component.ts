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
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router
    ) { }
    changeType(e){
      this.typeval=e;
    //  this.form.value.type=this.typeval;
      console.log("type",this.typeval)
    }
  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name_ar:['',Validators.required],
      name_en:['',Validators.required],
      main_specialist_id:['',Validators.required],
      type:['',Validators.required],
    })
    this.categoryList()
  }
 

  categoryList(){
    this.spinner.show()
    this.service.allCategories().pipe(map(res=>res['data'])).subscribe(res=>{
    this.spinner.hide()
    console.log('res')
      console.log(res)
      this.categories=res
    })
  }


  submit(){
    console.log('Form Work')
    this.spinner.show()
    let form={
      ...this.form.value,
      // type:this.typeval
   
    }
    console.log(form)
    this.service.addSubCategory(form).subscribe(res=>{
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم إضافة الخدمة الفرعية بنجاح',
        'success'
      )
      console.log("helllllllo",res)
      this.router.navigate(['/app/sub/list'])
    })
  }

  

}
