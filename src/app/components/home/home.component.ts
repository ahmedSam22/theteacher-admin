import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public timeNow: Date = new Date();
  public welcomePhrase;
  user

  ads = []
  categories = []
  countries = []
  citties = []
  
  constructor(
    private authentication:AuthenticationService
    ) { 
    this.authentication.currentUser.subscribe(currentUserSubject => this.user = currentUserSubject)
    console.log(this.user)
  }

  ngOnInit(): void {
    this.getDate()
  
  }
  getDate(){
    setInterval(() => { this.timeNow = new Date() }, 1);
    var myDate = new Date();
    var hrs = myDate.getHours();
    if (hrs < 12)
      this.welcomePhrase = 'صباح الخير';
    else 
      this.welcomePhrase = 'مساء الخير';
  }
}
