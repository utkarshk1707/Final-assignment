import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SQLite ,SQLiteObject} from '@ionic-native/sqlite/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { JsonPipe } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  Hotel = {};
  userData = {};
 
  name: string;
  contact:string;
  password: string;
  cpassword: string;
  email: string;
  form: FormGroup;
  constructor(private  router:  Router,private sqlite: SQLite,public afAuth :AngularFireAuth, public afDB:AngularFireDatabase,public alertCtrl:AlertController) {
    
   }

  ngOnInit() {
    
  }

  async presentAlert( title:string,content: string){

    const alert =await this.alertCtrl.create({
      header: title,
      message: content,
      buttons:['ok']
    })
    
    await alert.present()

  }

  async register() {
    
    if(this.password !== this.cpassword){
      return console.error("password don't match")
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.password);
      // add user data to fire base 
      this.presentAlert('success','you are registered!')
      this.router.navigateByUrl('login');
      console.log(res);
    } catch (error) {
      console.dir(error);
    }
 
  }
}
