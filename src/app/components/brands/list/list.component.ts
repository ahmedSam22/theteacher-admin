import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { EditBrandComponent } from '../edit-brand/edit-brand.component';
import { ProviderDetailsComponent } from '../provider-details/provider-details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  type=0;
  public selectedRole = this.route.snapshot.paramMap.get('role');
 brands
  constructor( 
    public route: ActivatedRoute,
    private spinner:NgxSpinnerService,
    private service:GlobalService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getbrands()
  }
  getbrands(){
    this.spinner.show()
    this.service.getBrands().pipe(map(res=>res['data'])).subscribe((response:any)=>{
      console.log(response)
      this.brands = response
    this.spinner.hide()
    })
  }

  
        


  editBrand(brand){
    let dialogRef = this.dialog.open(EditBrandComponent, {
      data:brand,
      height: '650px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getbrands()
    });
  }
  deleteBrand(brand_id){
    this.spinner.show()
    this.service.deleteBrand(brand_id).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
              'نجاح',
              'تم حذف البراند بنجاح',
              'success'
            )
            this.getbrands()
          })
  }
}
