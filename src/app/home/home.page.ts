import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MenuController, ToastController, NavController } from '@ionic/angular';
import { MapPage} from '../map/map.page'
import {ListPage} from '../list/list.page'
import { Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'map',
              outlet: 'map',
              component: MapPage
          },
          {
              path: 'list',
              outlet: 'list',
              component: ListPage 
          }
      ]
  },
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
  }
];


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  tab1Root: any = MapPage;
  tab2Root: any = ListPage;

  constructor() {
  
  }

}


