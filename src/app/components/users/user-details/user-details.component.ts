import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: any}) { }

  ngOnInit(): void {
    console.log('user')
    console.log(this.data)
  }

}
