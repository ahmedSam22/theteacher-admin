import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form!:FormGroup;
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
    ) { }
    locationName;
   
  ngOnInit(): void {
    this.form=this.formbuilder.group({
     
      name:[this.data.name,Validators.required],
      email:[this.data.email,Validators.required],
      phone:[this.data.phone,Validators.required],
      password:['',Validators.required],
      confirm_password:['',Validators.required],
      link:['',Validators.required],
      info:['',Validators.required],
    })

    const map = new mapboxgl.Map({ 
      container: 'map', // container ID,
       
      accessToken: 'pk.eyJ1IjoiYmFzZW0xMjEyMTk5NCIsImEiOiJja3g1dTJrYnQxYXB6MzBvMWdrcjd5MXFmIn0.YtJZRMq7vvX4T3PGiHj70Q',
      style:'mapbox://styles/mapbox/streets-v11',
      center: [46.738586, 24.774265], // starting [long,lat]
      zoom: 9 // starting zoom
      });
      const geocoder = new MapboxGeocoder({
        accessToken: 'pk.eyJ1IjoiYmFzZW0xMjEyMTk5NCIsImEiOiJja3g1dTJrYnQxYXB6MzBvMWdrcjd5MXFmIn0.YtJZRMq7vvX4T3PGiHj70Q',
        marker: true,
        bbox: [34.453124, 16.3794990002701, 55.6666019457612, 32.1537299934705],
        placeholder: 'البحث عن موقعك'
       
      })
      map.addControl(geocoder);
      map.on('load', () => {
        map.addSource('single-point', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        });
        map.addLayer({
          id: 'point',
          source: 'single-point',
          type: 'circle',
          paint: {
            'circle-radius': 10,
            'circle-color': '#448ee4'
          }
        });
        geocoder.on('result', (event) => {
          (<any>map.getSource('single-point')).setData(event.result.geometry);
         
          this.selectLocation(event);
         // console.log(event);
        });
      });
  }
  lat ; 
  lng ;
  selectLocation(location: any) {
    this.locationName = location.result.place_name;
    this.lng = location.result.geometry.coordinates[0];
    this.lat = location.result.geometry.coordinates[1];
   console.log("lng:"+this.lng ,"lat:"+this.lat);
  }
  
  files: File[] = [];

onSelect(event) {
  console.log(event.addedFiles[0]);
  this.files=[]
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
submit(){
  let form = {
    ...this.form.value,
    lat:this.lat,
    lng:this.lng,
    image:this.files[0],
  }
  this.spinner.show()
  // this.service.editMaintain(form).subscribe(res=>{
  // this.spinner.hide()
  // Swal.fire(
  //     'نجاح',
  //     'تم تعديل مسؤول الصيانة بنجاح',
  //     'success'
  //   )
  // //  this.router.navigate(['/app/brands/list'])
  // })
}
 
}
