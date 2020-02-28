import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;
  constructor(private  router:  Router) { }

  ngOnInit() {
  }

  register(form) {
      this.router.navigateByUrl('/home');
      console.log("my values"+JSON.stringify(form.value));
  }
}
