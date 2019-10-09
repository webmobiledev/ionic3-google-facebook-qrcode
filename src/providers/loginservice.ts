import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

import { Device } from '@ionic-native/device';

const URL = 'http://35.189.187.130/max/server.php/api/v1';

@Injectable()
export class LoginService {
  uuid: string;
  loginState: boolean = false;
  public subject: any = new BehaviorSubject('Log in');
  headers = new Headers();
  
  constructor(public http: Http,
    private device: Device,
    private googlePlus: GooglePlus,
    private facebook: Facebook) {
    this.headers.append('Content-Type', 'application/json');
  }

  getUuid() {
    if(this.loginState == false) {
      return this.device.uuid;
    } else {
      return this.uuid;
    }
  }

  setUuid(uuid: string) {
    this.uuid = uuid;
  }

  setLoginState(state: boolean) {
    this.loginState = state;
    if(this.loginState) {
      this.subject.next('Log out');
    } else {
      this.subject.next('Log in');
    }
  }

  logout(){
    this.setLoginState(false);

    this.googlePlus.logout()
    .then(function (response) {
      console.log("Google logout success");
    },function (error) {
      console.log("Google logout failed");
    });

    this.facebook.logout()
    .then(function (response) {
      console.log("Facebook logout success");
    },function (error) {
      console.log("Facebook logout failed");
    });    
  }

  logInWithEmail(credentials) {
    return this.http.post(`${URL}/auth/login`, JSON.stringify(credentials), {headers: this.headers});
  }

  registerUser(user) {
    return this.http.post(`${URL}/auth/register`, JSON.stringify(user), {headers: this.headers});
  }

  getUuidFromServer(param, value) {
    return this.http.get(`${URL}/auth/getuuid?${param}=${value}`);
  }
}
