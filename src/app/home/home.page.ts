import { Component } from '@angular/core';
import { Platform } from '@ionic/angular'
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';



Hotels: new Array();
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lat: any;
  Lng: any;
  options: GeolocationOptions;
  currentPos: Geoposition;
  places: Array<any>;

  constructor(public platform: Platform) {

    Geolocation.getCurrentPosition().then((position) => {

      this.lat = position.coords.latitude
      this.Lng = position.coords.longitude;
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
    });
    console.log(this.lat,this.Lng)
    this.platform.ready().then(() => {

      var gps = new google.maps.LatLng(28.635955199999998, 77.3390336)
      var radius = 500;
      this.getHotels(gps, radius);
    })

  }

  getHotels(gps: any, radius: any) {
    var container = document.getElementById('map')
    var service = new google.maps.places.PlacesService(container);
    let request = {
      location: gps,
      radius: radius,
      types: ["hotels"]   
    };
    return new Promise((resolve, reject) => {
      service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
          alert(status);
        }

      });
    });

  }

}



