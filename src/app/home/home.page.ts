import { Component, ElementRef, ViewChild } from '@angular/core';

import { Geoposition, GeolocationOptions } from '@ionic-native/geolocation';


declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  HotelsList: Boolean;

  pos;
  map;
  constructor() {

  }

  
  ngOnInit(){
   
    this.initMap();
  }
  
  initMap() {
      // Set the default location and initialize all variables
      this.pos = {lat: -33.857, lng: 151.213};
      this.map = new google.maps.Map(document.getElementById('map'), {
          center: this.pos,
          zoom: 15
      });

      console.log(this.map);
      console.log(this.pos);
  }
  showNearbyHotels(){

   if('gethotels'){

    this.HotelsList = true;
   }
   else{
    this.HotelsList = false;
   }

  }


}


