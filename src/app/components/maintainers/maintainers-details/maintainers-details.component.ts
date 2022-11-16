import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintainers-details',
  templateUrl: './maintainers-details.component.html',
  styleUrls: ['./maintainers-details.component.scss']
})
export class MaintainersDetailsComponent implements OnInit {
  brands = []
  specialists =[]
  info;
  constructor(@Inject(MAT_DIALOG_DATA) public data:{user},private router:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    console.log('user')
    this.info=this.data
    console.log("user",this.info)

    this.brands=this.info.maintainer.brands;
    console.log("BBBBBB", this.brands)

    this.specialists=this.info.maintainer.specialists;
    console.log("BBBBBB", this.specialists)
  }

}
