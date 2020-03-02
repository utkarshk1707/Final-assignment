import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
 
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
 
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
 
import { HttpClientModule } from '@angular/common/http';
import {AngularFireAuthModule} from '@angular/fire/auth'
import {AngularFireDatabaseModule} from '@angular/fire/database'
import { from } from 'rxjs';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,AngularFireAuthModule,AngularFireDatabaseModule],
  providers: [
    StatusBar,
    SplashScreen,
    FormsModule,
    SQLite,
    SQLitePorter,
    ReactiveFormsModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Location,
        { provide: LocationStrategy, useClass: PathLocationStrategy }     
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
