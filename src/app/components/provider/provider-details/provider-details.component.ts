import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.scss']
})
export class ProviderDetailsComponent implements OnInit {

  // baseUrl=environment.baseURL
  constructor(@Inject(MAT_DIALOG_DATA)public data: {data: string}) { }

  ngOnInit(): void {
    // console.log('this.data')
    // console.log(this.data)
    // console.log(this.data)
  }


}
