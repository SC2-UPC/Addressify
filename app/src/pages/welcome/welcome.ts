import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, ToastController} from 'ionic-angular';
import {User} from "../../providers/providers";
import {Storage} from "@ionic/storage";

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
              private storage:Storage) {

  }

  login() {
    this.navCtrl.push('LoginPage');
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
}
