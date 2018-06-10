import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { ForgotPasswordPage } from '../pages'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private storage:Storage) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      let user:any;
      user=resp;
      this.storage.set('user', user);
      this.navCtrl.push(MainPage);
    }, (err) => {
      // Unable to log in
      if(err.status==404) {
        let toast = this.toastCtrl.create({
          message: "Usuario no existente",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }else {
        // Unable to sign up
        let toast = this.toastCtrl.create({
          message: "Lo sentimos, no se ha podido iniciar sesión",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    });
  }

  forgotPass(){
     this.navCtrl.push(ForgotPasswordPage);
  }
}
