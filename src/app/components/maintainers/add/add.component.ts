import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form!:FormGroup;
  locationName;
  dropdownList = [];
  dropdownSettings = {};
  selectedItems: any[];
  specialists;
  dropdownList2 = [];
  dropdownSettings2 = {};
  selectedItems2: any[];
  brands;
  showMainSpecialist = false
  constructor(
    private formbuilder:FormBuilder,
    private service:GlobalService,
    private spinner:NgxSpinnerService,
    private router:Router
    ) { }
    
  ngOnInit(): void {
    this.showMainSpecialist = false;
    this.form=this.formbuilder.group({
     
      name:['',Validators.required],
      description:['',Validators.required],
      link:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      password:['',Validators.required],
      confirm_password:['',Validators.required],
      
     
    })
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'اختيار الكل ',
      unSelectAllText: 'الغاء الاختيار',
      itemsShowLimit: 10,
      allowSearchFilter: false
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'اختيار الكل ',
      unSelectAllText: 'الغاء الاختيار',
      itemsShowLimit: 10,
      allowSearchFilter: false
    };
    this.service.getBrands().subscribe(res=>{
      this.brands = res['data'];
      this.dropdownList = this.brands
      console.log(this.dropdownList)
    
    })
    
    this.mainSpecialist(this.selectedItems)
    
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
  mainSpecialist(selectedItems){
    this.service.getMainSpecialistByBrandId(selectedItems).subscribe(res=>{
      this.specialists = res['data'];
      this.dropdownList2 = this.specialists
      console.log("dropdownList2",this.dropdownList2)

    })
  }
  lat:any ; 
  lng:any;
  selectLocation(location: any) {
    this.locationName = location.result.place_name;
    this.lng = location.result.geometry.coordinates[0];
    this.lat = location.result.geometry.coordinates[1];
  //  console.log("lng:"+this.lng ,"lat:"+this.lat);
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
onItemSelect(item: any) {
  this.showMainSpecialist = true;
 
    this.mainSpecialist(item.id)
}
onSelectAll(items: any) {
  this.showMainSpecialist = true;
  
  this.mainSpecialist(items.id)
}
onItemSelect2(item:any) {

}
onSelectAll2(items:any){

}
submit(){
  console.log("lng:"+this.lng ,"lat:"+this.lat);
  let form = {
    ...this.form.value,
    lat:this.lat,
    lng:this.lng,
    image:this.files[0],
    specialists:this.selectedItems2 ,
    brands:this.selectedItems,
  }
  this.spinner.show()
  // this.service.addMaintain(form).subscribe(res=>{
  // this.spinner.hide()
  // Swal.fire(
  //     'نجاح',
  //     'تم إضافة مسؤول الصيانة بنجاح',
  //     'success'
  //   )
  //  this.router.navigate(['/app/maintainer/list'])
  // console.log("resssss register " , res)
  // })
  
}
 
}
