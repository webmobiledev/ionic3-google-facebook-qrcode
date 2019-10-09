import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { LoginService } from '../../providers/loginservice';
 
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
 
  name: string;
  phone: number;
  email: string;
  password: string;
  confirmPassword: string;
  valid: any = {};

  constructor(public nav: NavController,
    public loginService: LoginService) {
 
  }
 
  register(){
    if (this.password != this.confirmPassword) {
      this.confirmPassword = '';
      return;
    }

    let user = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      password: this.password,
    };

    this.loginService.registerUser(user).subscribe(res => {
      this.loginService.setUuid(res.json().uuid);
      this.loginService.setLoginState(true);
      this.nav.setRoot(HomePage);
    }, (err) => {
      this.valid = err.json();
    }); 
  }
 
}