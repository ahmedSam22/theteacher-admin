import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any,
    ) { }
    form!:FormGroup;
    locationName;
    dropdownList = [];
    dropdownSettings = {};
    selectedItems: any[];
    selectedItems1: any[];
    dropdownList2 = [];
    dropdownSettings2 = {};
    selectedItems2: any[];
    brands;
    specialists;
    showMainSpecialist=false;
    image_edit=false;
    ch_b=false;
    ch_m=false;
  ngOnInit(): void {
    this.showMainSpecialist = false;
   // console.log("dddddddddd",this.data)
    this.lat=this.data.maintainer.lat;
    this.lng=this.data.maintainer.lng;
    this.selectedItems1=this.data.maintainer.brands
    this.selectedItems2=this.data.maintainer.specialists
    this.form=this.formbuilder.group({
     
      name:[this.data.name,Validators.required],
      email:[this.data.email,Validators.required],
      phone:[this.data.phone,Validators.required],
      link:[this.data.maintainer.link,Validators.required],
      description:[this.data.maintainer.description,Validators.required],
      // brands:[this.data.maintainer.brands,Validators.required],
      // specialists:[this.data.maintainer.specialists,Validators.required],
    })
    
    this.service.getBrands().subscribe(res=>{
      this.brands = res['data'];
      this.dropdownList = this.brands
    //  console.log("brrrrrrrands",this.dropdownList)

    })
 //   this.mainSpecialist(this.selectedItems)
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
  // console.log("lng:"+this.lng ,"lat:"+this.lat);
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
 
 
onChange(e){
  this.showMainSpecialist = true;
  // this.selectedItems=e.value
 //console.log("EEEEEE",e.value)
 this.selectedItems1=e.value
 for(let i=0 ; i<e.value.length ; i++){
  this.selectedItems=e.value[i].id
 }
 this.mainSpecialist(this.selectedItems)
 this.ch_b=true
}
onChangeSpecialist(e){
  this.selectedItems2=e.value;
  this.ch_m=true
}
mainSpecialist(selectedItems){
  this.service.getMainSpecialistByBrandId(selectedItems).subscribe(res=>{
    //console.log("tessstt11",selectedItems)
    this.specialists = res['data'];
    //console.log("tessstt222", this.specialists )
    this.dropdownList2 = this.specialists
   // console.log("dropdownList2",this.dropdownList2)

  })
}
submit(){
  let fo ;
  console.log("lng:"+this.lng ,"lat:"+this.lat);
  console.log("ssssss",this.form.value.specialists)
  console.log("bbbbbbb",this.form.value.brands)
  if(this.ch_m==false&&this.ch_b==false) {
    fo= {
      ...this.form.value,
      maintainer_id:this.data.maintainer.user_id,
      lat:this.lat,
      lng:this.lng,
      image:this.files[0],
      specialists:this.data.maintainer.specialists ,
      brands:this.data.maintainer.brands,
      flag:0
    }
   // console.log("IFFFFF" ,fo.brands)
  }
  else {
    fo= {
      ...this.form.value,
      maintainer_id:this.data.maintainer.user_id,
      lat:this.lat,
      lng:this.lng,
      image:this.files[0],
      specialists:this.selectedItems2 ,
      brands:this.selectedItems1,
      flag:1
    }
  //  console.log("ELSEEEE", fo.brands )
  }
   
  console.log("formdddddd",fo)
  this.spinner.show()
  // this.service.editMaintain(fo).subscribe(res=>{
  // this.spinner.hide()
  // Swal.fire(
  //     'نجاح',
  //     'تم تعديل مسؤول الصيانة بنجاح',
  //     'success'
  //   )
  // //  this.router.navigate(['/app/brands/list'])
  // console.log("resssss updateeee register " , res)
  // })
  
}
 
}
