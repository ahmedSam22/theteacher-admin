import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {

  form:FormGroup;

  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],
    })
  }

  files: File[] = [];

onSelect(event) {
  console.log(event.addedFiles[0]);
  this.files=[]
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

  submit(){
    let form = {
      name:this.form.value.name,
      description:this.form.value.description,
      logo_image:this.files[0]
    }
    this.spinner.show()
    this.service.addBrand(form).subscribe(res=>{
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم إضافة البراند بنجاح',
        'success'
      )
      this.router.navigate(['/app/brands/list'])
    })
  }

}
