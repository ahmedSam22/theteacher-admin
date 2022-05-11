import { GlobalService } from './../../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  type = 1;
  comps
  constructor(private dialog:MatDialog,private spinner:NgxSpinnerService,private globalService:GlobalService) { }

  ngOnInit(): void {
    this.compList(this.type)
  }

  compList(type){
    this.spinner.show()
    this.globalService.getComp(type).pipe(map(res=>res['data'])).subscribe(res=>{
      this.spinner.hide()
      this.comps=res.data
      console.log(res.data)
    })
  }

  compDetails(comp){

  }

  getType(id){
    this.type = id
    this.compList(id)
  }
}
