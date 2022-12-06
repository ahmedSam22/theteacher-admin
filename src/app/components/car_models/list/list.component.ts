import { EditModelComponent } from './../edit-model/edit-model.component';
import { GlobalService } from '../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  models = [];
  brands = [];
  change_model:any=[];
  param:any;
  constructor(private route: ActivatedRoute,private dialog:MatDialog,private spinner:NgxSpinnerService,private service: GlobalService) { }

  ngOnInit(): void {
    this.param= this.route.snapshot.paramMap.get('id');
    console.log("param", this.param)
   this.getAllBrands() ;
 }

  getAllBrands(){
    this.service.getBrands().subscribe((res:any)=>{ 
      this.brands=res['data'] ;
      this.brands=[...this.brands].reverse()
      console.log("All Brands" , this.brands)
      this.change_model[0]= this.param;
      this.getAllModels(this.change_model);
    })
  }

  changeBrands(event) {
    this.change_model[0]=event.target.value
    this.getAllModels(this.change_model)
  }

  getAllModels(model){
    this.change_model[0]=model[0]
    this.spinner.show();
     this.service.getModelsByBrandId(this.change_model).subscribe((res:any)=>{
     this.spinner.hide();
     this.models=res['data']
     this.models=[...this.models].reverse()
        console.log("All Models" , this.models)
     })
  }

 
  onShowModel(model) {
    let dialogRef = this.dialog.open( ProductDetailsComponent, {
      data: model,
      height: '200px',
      width: '600px',
    });
  }

  onEditModel(model) {
    let dialogRef = this.dialog.open( EditModelComponent, {
      data: model,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
      // this.onShowModels();
      this.getAllBrands() 
    })
  }

  onDeleteModel(model_id) {
    this.spinner.show();
    this.service.deleteModels(model_id).subscribe( deleteResponse => {
      console.log(deleteResponse);
      this.spinner.hide();
      Swal.fire(
        'نجااااح',
        'تم حذف الموديل  بنجاح',
        'success'
        )
    });
 // this.onShowModels();
  this.getAllBrands() 
  }
}