import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  products: Observable<any[]>;
  developers : any;
  developer = {};
  product = {};
 
  email: string;
  form: FormGroup;
  constructor(private  router:  Router,private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDevs().subscribe(devs => {
          this.developers = devs;
        })
        this.products = this.db.getProducts();
      }
    });
  }


  register(form) {
    
    try{

      console.log("my values"+JSON.stringify(form.value));
      this.db.addUserData(this.email,JSON.stringify(form.value))
      if(this.db.loadUserData(this.email)){
      alert("Register succesfull");
      }
      this.router.navigateByUrl('/home');
      

    }catch(e){
      console.log(e)
    }
      
  }
}
