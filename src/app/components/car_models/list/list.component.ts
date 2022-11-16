import { EditModelComponent } from './../edit-model/edit-model.component';
import { GlobalService } from '../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  models = [];
  brands = [];
  model:any;
  constructor(private dialog:MatDialog,private spinner:NgxSpinnerService,private service: GlobalService) { }

  ngOnInit(): void {
   this.getAllBrands() ;

  }

  getAllBrands(){
    this.service.getBrands().subscribe((res:any)=>{ 
      this.brands=res['data'] ;
      console.log("All Brands" , this.brands)
      this.model= this.brands[0].id ;
      this.getAllModels(this.model);
    })
  }

  changeBrands(event) {
    this.model=event.target.value
    this.getAllModels(this.model)
  }

  getAllModels(model){
     this.model=model
     this.service.getModelsByBrandId(this.model).subscribe((res:any)=>{
     this.models=res['data']
        console.log("All Models" , this.models)
     })
  }

  // onShowModels(){
  //   this.spinner.show();
  //   this.globalService.getBrands().subscribe(res=>{
  //     console.log(res);
  //     this.brands = res['data'];
  //     console.log('Brands', this.brands);
  //   });
  //   this.globalService.allModels()
  //   .pipe(
  //     map( models => {
  //       const newModels = [];
  //       for( let model of models['data'] ) {
  //         let brandObj = this.brands.find( brand => model.brand_id == brand.id )
  //         let newModel = { ...model, brandName: brandObj?.name }
  //         newModels.push(newModel);
  //       }
  //       return newModels;
  //     })
  //   )
  //   .subscribe( newModels => {
  //     console.log('newModels', newModels);
  //     this.spinner.hide();
  //     this.models = newModels;
  //     console.log('Models', this.models);
  //   });
  // }

  onShowModel(model) {
    let dialogRef = this.dialog.open( ProductDetailsComponent, {
      data: model,
      height: '300px',
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