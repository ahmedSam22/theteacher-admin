import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public timeNow: Date = new Date();
  public welcomePhrase;
  user;
  statistics;

  ads = []
  categories = []
  countries = []
  citties = []
  
  constructor(
    private authentication:AuthenticationService,
    private service:GlobalService,
    private spinner:NgxSpinnerService
    ) { 
    this.authentication.currentUser.subscribe(currentUserSubject => this.user = currentUserSubject)
    console.log(this.user)
  }

  ngOnInit(): void {
    // this.getDate()
    // this.homeStatistics()
  }
  // getDate(){
  //   setInterval(() => { this.timeNow = new Date() }, 1);
  //   var myDate = new Date();
  //   var hrs = myDate.getHours();
  //   if (hrs < 12)
  //     this.welcomePhrase = 'صباح الخير';
  //   else 
  //     this.welcomePhrase = 'مساء الخير';
  // }

  // homeStatistics(){
  //   this.spinner.show()
  //   this.service.homeStatistics().pipe(map(res=>res['data'])).subscribe(res=>{
  //     this.spinner.hide()
  //     console.log('Home statistics')
  //     console.log(res)
  //     this.statistics=res
  //   })
  // }
}
