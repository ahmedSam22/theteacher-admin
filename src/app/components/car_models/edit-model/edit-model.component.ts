import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.scss']
})
export class EditModelComponent implements OnInit {

  form:FormGroup;
  brands = [];

  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private router:Router
    ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.form = this.formbuilder.group({
      // name:[this.data.name, Validators.required],
      name_ar:[this.data.name_ar, Validators.required],
      name_en:[this.data.name_en, Validators.required],
      brand_id:[this.data.brand_id, Validators.required],
    });
    this.service.getBrands().subscribe(res=>{
      this.brands = res['data'];
    })
  }

  onSubmit(){
    // let formn = {
    //   name: this.form.value.name,
    //   brand_id: this.form.value.brand_id,
    //   type_id: this.data.id
    // }
    let formn = {
      name_ar: this.form.value.name_ar,
      name_en: this.form.value.name_en,
      brand_id: this.form.value.brand_id,
      type_id: this.data.id
    }
    this.spinner.show();
    this.service.updateModel(formn).subscribe(res=>{
      console.log(res)
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم إضافة الموديل بنجاح',
        'success'
      )
      this.dialog.closeAll();
      this.router.navigate(['/app/car-models/list']);
    })
  }
}