import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { LoadingController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  password: string;
  email: string;
  WebclientId: String = "293552946497-2jgu2s608f6mvt7goi33um21aeusc47r.apps.googleusercontent.com"
  isLoading = true;
  constructor(private httpclient: HttpClient, 
    private router: Router, 
    public afAuth: AngularFireAuth, 
    public navCtrl: NavController,
     public loadingController: LoadingController, 
     private googlePlus: GooglePlus) { 

     }


  ngOnInit() {
   
  }



  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: "bubbles",
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async login() {

    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
      if (res.user) {
        this.router.navigateByUrl('/home');
      }
    }
    catch (err) {
      console.log(err);
      if (err.code === "auth/user-not-found") {
        alert("user not found")
      }
      if (err.code === "auth/invalid-email") {
        alert("user not found")
      }
      // if (err.code === "auth/email-already-in-use") {
      //   alert("email already in use")
      // }
      // above commented check is for registration :p
      if(err.code === "auth/network-request-failed"){

        alert("network error");
      }
      

    }

  }
  async test() {
    try {
      var data: any;
      await this.httpclient.post("https://maps.googleapis.com/maps/api/place/nearbysearch/js?type=restaurant&key=AIzaSyCHieemnqXzDfVcOkp_0ZzZh2VfC-jylZY", "type=JSON/javascript").subscribe((data) => {
        console.log(data);
        console.log
      })
    } catch (error) {

      console.log(error)
    }

  }
  googleSignIn() {

    this.googlePlus.login({ 'webClientId': this.WebclientId, 'offline': true })
      .then((res) => {
        localStorage.setItem("userDetails", res);

        if (res) {
          this.navCtrl.navigateForward('/home');

        }

      }, (error) => {

        var errormsg: string = error.error.Message;
        console.log(errormsg);
        alert(errormsg);

      });
  }
}
