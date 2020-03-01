import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form :FormGroup;
  password:string;
  email : string;
  constructor(private  router:  Router) { }

  ngOnInit() {
  }

  login(form){
      this.router.navigateByUrl('/home');
  
  }
}
