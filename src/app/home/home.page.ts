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
  expiryDate: string;
  serialNumber: string;
  lotNumber: string;
  Form: FormGroup;


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Barcode scanning cancelled',
      duration: 2000
    });
    toast.present();
  }

  constructor(private menucontroller: MenuController, private formBuilder: FormBuilder, private barcodeScanner: BarcodeScanner, private androidPermissions: AndroidPermissions, public toastController: ToastController, private navCtrl: NavController, private http: HttpClient) {
    this.Form = this.formBuilder.group({
      idTextValidation: new FormControl('', Validators.compose([Validators.required, this.idTextValidation, Validators.maxLength(18), Validators.minLength(14)])),
      DOBValidation: new FormControl('', this.dateValidator)
      });
    this.menuClose();
  }

  menuClose() {
    this.menucontroller.close();
  }

  submit() {
    console.log("submit");
    let params = {};

    params['name'] = this.idText;
    console.log("name" + this.idText);
    params['sex'] = this.expiryDate.split('/').join('');
    params['dob'] = this.lotNumber;
    params['serialNumber'] = this.serialNumber;


    localStorage.setItem("submitParams", JSON.stringify(params)); // here add submitparams json to database

    this.navCtrl.navigateForward('/Hotels');
  }

  googleSignIn(){

  }

  dateFormatter(val) {
    if (val.target.value.length == 2) {
      this.expiryDate = val.target.value + '/';
    }
  }

  dateValidator(control: AbstractControl) {
    //console.log("in date");
    if ((typeof this !== 'undefined') && (typeof this.idText !== 'undefined')) {
      if (this.idText.length == 18) {
        //console.log(""+this.idText.length);
        return null;
      }
    }
    if (control && control.value !== null || control.value !== undefined) {
      const input = String(control.value);
      if (input.length > 0 && input.length != 7) {
        return { Errors: true };
      } else {
        try {
          let month = parseInt(input.split('/')[0]);
          if (month > 12) {
            return { Errors: true };
          }
          parseInt(input.split('/')[1]);
          parseInt(new Date().getFullYear().toString());
          parseInt(new Date().getMonth().toString());
        } catch (e) {
          return { Errors: true };
        }
      }
    }
    return null;
  }


  idTextValidation(control: AbstractControl) {
    //console.log("text")
    if (control && control.value !== null || control.value !== undefined) {
      const input = String(control.value);
      //console.log(input.length);
      if (input.length != 14) {
        if (input.length != 18) {
          return { 'Errors': true };
        }
      }
    }
    return null;

  }

  ifSSCC(): Boolean {

    const datecontrol = this.Form.get('expiryDateValidation');
    const lotNumbercontrol = this.Form.get('lotNumberValidation');

    //console.log('if SSCC');
    if (this.idText != null && this.idText.length == 18) {

      datecontrol.setValidators(null);
      lotNumbercontrol.setValidators(null);
      datecontrol.updateValueAndValidity;
      datecontrol.updateValueAndValidity;
      //console.log("SSCC check");
      //console.log("Validity : "+this.Form.valid);
      return true;
    }
    else {
      // console.log("SSCC check failed");
      return false;
    }
  }

}


