import { Component } from '@angular/core';
import { Platform } from '@ionic/angular'
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { element, error } from 'protractor';
import {GoogleMaps} from '@ionic-native/google-maps'
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { AngularFirestore} from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
 
var google = require('@ionic-native/google-maps') ;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

 
  
  options: GeolocationOptions;
  currentPos: Geoposition;
  mapElement:HTMLElement;
  places: Array<any>;
  hotels:[
    {  
      "id":1,
      "name":"Hotel-1"
   },
   {  
      "id":2,
      "name":"Hotel-2"
   }
  ]
  constructor(public platform: Platform,  public afAuth: AngularFireAuth,private firestore: AngularFirestore,private router: Router) {

    this.getHotelsdata();
    this.platform.ready().then(() => {

    Geolocation.getCurrentPosition().then((position) => {

      console.log(position.coords.latitude, position.coords.longitude)
      var gps = new google.map.LatLng(position.coords.latitude, position.coords.longitude)
      var radius = 500;
      var tHis =this;
      console.log(gps)
      this.getHotels(gps, radius).then((results:Array<any>)=>{

        results.forEach((element)=>{

          tHis.places.push(element);
        });
        console.log(this.places);
      },(status)=>console.log("status: "+status));
    });

    });
   
     
  }

  getHotelsdata(){

    
    let setDoc = this.firestore.collection('hotels').doc('4').set({
      name: 'hotel-4'
    });
    let hotelsREf = this.firestore.collection('hotels').get()

    console.log(setDoc);

    console.log(hotelsREf);
  }

//   addData(){

//     this.hotels.forEach(function(obj) {
//       firebase.firestore().collection("hotels").add({
//           id: obj.id,
//           name: obj.name
//       }).then(function(docRef) {
//           console.log("Document written with ID: ", docRef.id);
//       })
//       .catch(function(error) {
//           console.error("Error adding document: ", error);
//       });
//   }
// }

async signOut(){
  try {
    await  this.afAuth.auth.signOut().then(function(res) {
      // Sign-out successful.
      console.log(res);
      this.router.navigateByUrl('/login');

    alert("Logout Successfull");

    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });

    
  }
  catch (err) {
    console.log(err);
  }

}
  getHotels(gps: any, radius: any) {
    
    
  
    this.mapElement=document.getElementById('map');
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



