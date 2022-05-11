import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-values',
  templateUrl: './add-values.component.html',
  styleUrls: ['./add-values.component.scss']
})
export class AddValuesComponent implements OnInit {
  id;
  main;
  form:FormGroup;

   
    constructor(private formbuilder:FormBuilder,private spinner: NgxSpinnerService,private service:GlobalService, private route :ActivatedRoute ,private router:Router) { }

  ngOnInit(): void {
   this.id = this.route.snapshot.params['id']
  //  this.main=this.route.snapshot.params['main_specialist_id']
    console.log(this.id)
    this.form=this.formbuilder.group({
      // name:['',Validators.required],
      name_ar:['',Validators.required],
      name_en:['',Validators.required],
      price:['',Validators.required],
      secondary_specialist_id:[this.id,Validators.required],
   
    });
  }
  onSubmit(){
    console.log('Form Work');
    //email:this.route.snapshot.paramMap.get('data.id')
    console.log(this.form.value)
    this.spinner.show();
    this.service.addBand(this.form.value).subscribe(res=>{
      console.log(res)
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم إضافة البند بنجاح',
        'success'
      )
      console.log("baaaaaand",res)
      this.router.navigate(['/app/sub/list'])
    })
  }
}
