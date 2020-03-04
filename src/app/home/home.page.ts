import { Component } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular'
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { element, error } from 'protractor';
import { GoogleMaps } from '@ionic-native/google-maps'
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';

var google = require('@ionic-native/google-maps');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  isLoading =true;
  places = new Array();
  data = true;
  options: GeolocationOptions;
  currentPos: Geoposition;
  mapElement: HTMLElement;

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: "bubbles"
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
  constructor(public platform: Platform, public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router,public loadingController:LoadingController) {

    this.getHotelsDbData();
    this.platform.ready().then(() => {

      Geolocation.getCurrentPosition().then((position) => {

        console.log(position.coords.latitude, position.coords.longitude)
        var gps = new google.map.LatLng(position.coords.latitude, position.coords.longitude)
        var radius = 500;
        var tHis = this;
        console.log(gps)
        this.getHotels(gps, radius).then((results: Array<any>) => {

          results.forEach((element) => {

            console.log(element);
            // tHis.places.push(element);
          });
          // console.log(this.places);
        }, (status) => console.log("status: " + status));
      });

    });


  }

  getHotelsDbData() {


    // let setDoc = this.firestore.collection('hotels').doc('4').set({
    //   name: 'hotel-4'
    // });

    // console.log(setDoc);
    this.present()
    try {

      let hotelsREf = this.firestore.collection('hotels').get().subscribe(
        (snapshot) => {
          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data().name);
            this.places.push(doc.data().name);
            this.data =false;
          });
        }
      )
      // if(this.places.length > 1){
      //   this.data =false;
      // }
      console.log(this.places);
      console.log(hotelsREf);

    
      this.dismiss()
    } catch (error) {
      
      this.data = true;
      console.log(error);
    }
    
  }

  async signOut() {
    try {
      await this.afAuth.auth.signOut().then(function (res) {
        // Sign-out successful.
        console.log(res);
        this.router.navigateByUrl('/login');

        alert("Logout Successfull");

      }).catch(function (error) {
        // An error happened.
        console.log(error);
      });


    }
    catch (err) {
      console.log(err);
    }

  }
  getHotels(gps: any, radius: any) {



    this.mapElement = document.getElementById('map');
    console.log(this.mapElement);
    var service = new google.maps.places.PlacesService(this.mapElement);
    let request = {
      location: gps,
      radius: radius,
      types: ["hotels"]
    };
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
      } else {
        console.log(status);
        alert(status);
      }

    });
    return new Promise((resolve, reject) => {

    });

  }

}



