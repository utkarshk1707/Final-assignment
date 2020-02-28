import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MenuController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  idText: string;
  DOB: string;
  Gender: string;
  Form: FormGroup;
  Contact: string;
  firstName: string;
  lastName : string;

  constructor(private menucontroller: MenuController, private formBuilder: FormBuilder, public toastController: ToastController, private navCtrl: NavController) {
    this.Form = this.formBuilder.group({
      idTextValidation: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(18), Validators.minLength(14)])),
      DOBValidation: new FormControl('', Validators.compose([Validators.required])),
      GenderValidation: new FormControl('',Validators.compose([Validators.required])),
      Contactvalidation: new FormControl('', Validators.compose([Validators.required]))
      });
    this.menuClose();
  }

  menuClose() {
    this.menucontroller.close();
  }

  submit() {
    console.log("submit");
    let params = {};

    params['name'] = this.firstName+" "+this.lastName;
    console.log("name:" + this.firstName+" "+this.lastName);
    params['sex'] = this.Gender;
    params['dob'] = this.DOB;
    params['contact'] = this.Contact;


    localStorage.setItem("submitParams", JSON.stringify(params)); // here add submitparams json to database

    this.navCtrl.navigateForward('/hotels');
  }

  googleSignIn(){

  }


}


