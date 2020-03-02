import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form :FormGroup;
  password:string;
  email : string;
  constructor(private  router:  Router,public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async login(){
      
      try{
        const res = await this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password);
        if(res.user){
          this.router.navigateByUrl('/home');
        }
      }
      catch(err){
        console.log(err);
        if(err.code ==="auth/user-not-found"){
          alert("user not found")
        }
        if(err.code ==="auth/invalid-email"){
          alert("user not found")
        }

      }
  
  }
}
