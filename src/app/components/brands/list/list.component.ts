import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
export class PackagesListComponent implements OnInit {

  type=0;
  pageStatus:number = 0;
  allPlans
  public selectedRole = this.route.snapshot.paramMap.get('role');
 
  constructor( 
    public route: ActivatedRoute,
    private spinner:NgxSpinnerService,
    private service:GlobalService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getPlans()
  }
  getPlans(){
    

    this.spinner.show()
    this.service.getAllPlans().pipe(map(res=>res['data'])).subscribe((response:any)=>{
      console.log("All brands", response)
      this.allPlans = response
      this.pageStatus = 0
    this.spinner.hide()
    })
  }

  
        


  editPlan(plan){
    let dialogRef = this.dialog.open(EditBrandComponent, {
      data:plan,
      height: '650px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPlans()
    });
  }

  deletePlan(id){
    this.spinner.show()
    this.service.deletePlan(id).subscribe(res=>{
      this.spinner.hide()
      Swal.fire(
              'نجاح',
              'تم حذف الباقة بنجاح',
              'success'
            )
            this.getPlans()
          })
  }

  getPlansRequests(){
    this.spinner.show()
    this.service.getAllPlansRequests().pipe(map(res=>res['data'])).subscribe((response:any)=>{
      console.log("All brands", response)
      this.allPlans = response
      this.pageStatus = 1
      
    this.spinner.hide()
    })
  }

  acceptPlan(userId , planId){

    let body = {
      user_id:userId,
      subscription_plan_id:planId
    }

    this.service.acceptPlan(body).subscribe((response:any)=>{
      console.log(response);
      if(response.status == true){
        Swal.fire(
          'نجاح',
          'تم الاشتراك  بنجاح',
          'success'
        )
      }
    this.spinner.hide()
    })
  }


  rejectPlan(id){
    this.service.rejectPlan(id).pipe(map(res=>res['data'])).subscribe((response:any)=>{    
      console.log(response);
      if(response.status == true){
        Swal.fire(
          'نجاح',
          'تم حذف الباقة بنجاح',
          'success'
        )
      }
    this.spinner.hide()
    })
  }

}
