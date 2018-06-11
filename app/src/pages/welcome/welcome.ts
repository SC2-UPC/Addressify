import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, ToastController} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import {User} from "../../providers/providers";
import {Storage} from "@ionic/storage";
import {MainPage} from "../pages";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/

@IonicPage()

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})

export class WelcomePage {



  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public user: User,
              private storage:Storage,
              private fb: Facebook) {

  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  openContact(){
    let addModal = this.modalCtrl.create('ContactPage');
    addModal.onDidDismiss(message => {
      if (message) {
        console.log("Ok")
      }
    })
    addModal.present();
  }

  fbLogin(){
    this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      console.log(response)
      var token:any=response.authResponse.accessToken;
      this.fb.api('me?fields=id,name,email,first_name,picture.width(300).height(300)',
        []).then(profile => {
          let prof:any;
          prof=profile
          console.log("Profile",prof)
          let u:any={};
          let userr:any={}
          userr.email=prof.email;
          userr.name=prof.name;
          u.token=token;
          u.id=prof
          userr.profileImage=prof.picture.data.url;
          u.userr=userr;
        this.user.loginFB(u).subscribe((resp) => {
          let newUser:any;
          newUser=resp;
          this.storage.set('user', newUser);
          this.navCtrl.push(MainPage);
          /*let toast = this.toastCtrl.create({
            message: "Usuario actualizado",
            duration: 3000,
            position: 'top'
          });
          toast.present();*/
        }, (err) => {
          // Unable to log in
          let toast = this.toastCtrl.create({
            message: "Error al iniciar sesión con Facebook",
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });

      });
    });

    /*this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      .catch(e => console.log('Error logging into Facebook', e));*/
  }
}
