import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  form:FormGroup;
  color='#c7d494';
  constructor(private formbuilder:FormBuilder,private service:GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name_ar:['',Validators.required],
      name_en:['',Validators.required],
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
    console.log('Form Work')
    this.spinner.show()
    let form={
      ...this.form.value,
      image:this.files[0]
    }
    this.service.addCategory(form).subscribe(res=>{
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم إضافة الفئة بنجاح',
        'success'
      )
    })
  }

  Hi(){
    console.log('dsjbhfsdjhgdjshg')
  }

}
