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
    console.log("mmmm",this.data);
    this.form = this.formbuilder.group({
      name:[this.data.name, Validators.required],
      model_id:[this.data.id, Validators.required],
    });

    this.service.getBrands().subscribe(res=>{
      this.brands = res['data'];
    })
  }

  onSubmit(){
     console.log("dsadas",this.form.value)
    this.spinner.show();
    this.service.editModels(this.form.value).subscribe(res=>{
      console.log("resssss",res)
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم تعديل الموديل بنجاح',
        'success'
      )
      this.dialog.closeAll();
      this.router.navigate(['/app/car-models/list']);
    })
  }
}