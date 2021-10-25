import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  
  public selectedRole = this.route.snapshot.paramMap.get('role');
  public users = [
    {
      
    }
  ]
  constructor( 
    public route: ActivatedRoute,
    private spinner:NgxSpinnerService,
    private service:GlobalService,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
    // this.getUsers()
  }
  // getUsers(){
  //   this.spinner.show()
  //   this.service.allClients().pipe(map(res=>res['data'])).subscribe((response:any)=>{
  //     console.log(response)
  //     this.users = response
  //   this.spinner.hide()
  //   })
  // }

  viewUser(user){
    let dialogRef = this.dialog.open(UserDetailsComponent, {
      data:user,
      height: '550px',
      width: '500px',
    });
  }

}
