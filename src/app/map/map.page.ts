import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocationsService } from '../locations.service';
import { GoogleMaps } from '../google-maps.service';
import { NavController, Platform } from '@ionic/angular';


@Component({
  selector: 'page-map',
  templateUrl: 'map.page.html'
})
export class MapPage {

  mapElement: ElementRef;
  pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform, public locations: LocationsService) {

  }

  ionViewDidLoad() {

    this.platform.ready().then(() => {

      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
    
    });

  }
  

}