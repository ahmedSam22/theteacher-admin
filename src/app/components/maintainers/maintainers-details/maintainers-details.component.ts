import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintainers-details',
  templateUrl: './maintainers-details.component.html',
  styleUrls: ['./maintainers-details.component.scss']
})
export class MaintainersDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: any},private router:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    console.log('user')
    console.log(this.data)
  }

}
