import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
 
export interface Hotels {
  id: number,
  name: string,
  img: string
}
 

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  hotels = new BehaviorSubject([]);
  userData = new BehaviorSubject([]);
 
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'Hotels.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }
 
  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadHotels();
          this.loadUserData(null);  
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }
 
  getDatabaseState() {
    return this.dbReady.asObservable();
  }
 
  getDevs(): Observable<Hotels[]> {
    return this.hotels.asObservable();
  }
 
  getProducts(): Observable<any[]> {
    return this.userData.asObservable();
  }
  loadHotels() {
    return this.database.executeSql('SELECT * FROM Hotels', []).then(data => {
      let Hotels: Hotels[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let skills = [];
          if (data.rows.item(i).skills != '') {
            skills = JSON.parse(data.rows.item(i).skills);
          }
 
          Hotels.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,  
            img: data.rows.item(i).img
           });
        }
      }
      this.hotels.next(Hotels);
    });
  }
 
  addHotels(name, skills, img) {
    let data = [name, JSON.stringify(skills), img];
    return this.database.executeSql('INSERT INTO developer (name, skills, img) VALUES (?, ?, ?)', data).then(data => {
      this.loadHotels();
    });
  }
 
  getHotels(id): Promise<Hotels> {
    return this.database.executeSql('SELECT * FROM developer WHERE id = ?', [id]).then(data => {
      let skills = [];
      if (data.rows.item(0).skills != '') {
        skills = JSON.parse(data.rows.item(0).skills);
      }
 
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name, 
        skills: skills, 
        img: data.rows.item(0).img
      }
    });
  }
 
  deleteHotels(id) {
    return this.database.executeSql('DELETE FROM developer WHERE id = ?', [id]).then(_ => {
      this.loadHotels();
    });
  }
 
  updateDeveloper(dev: Hotels) {
    let data = [dev.name, dev.img];
    return this.database.executeSql(`UPDATE developer SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data).then(data => {
      this.loadHotels();
    })
  }
 
  loadUserData(email: string) {
    let query = 'SELECT * FROM userdata WHERE email ='+email;
    return this.database.executeSql(query, []).then(data => {
      let UserData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          UserData.push({ 
            name: data.rows.item(i).name,
            id: data.rows.item(i).id,
            creator: data.rows.item(i).creator,
           });
        }
      }
      this.userData.next(UserData);
    });
  }
 
  addUserData(email, userData) {
    try{

      let data = [email, userData];
    return this.database.executeSql('INSERT INTO product (email, userData) VALUES ('+email+', '+userData+')').then(data => {
      this.loadUserData(email);
    });
  }
    catch(e){
      console.log(e);
    }
    
}
}