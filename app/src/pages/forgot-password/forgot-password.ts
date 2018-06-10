import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import {IonicPage, NavController, ViewController, NavParams, AlertController,ToastController} from 'ionic-angular';
import { User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  email:FormGroup;


  constructor(public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController,
              private fb:FormBuilder, private alertCtrl: AlertController, public user: User,
              public toastCtrl: ToastController) {

    this.email=this.fb.group({
      email:''

    })

  }

  send(email){
    this.user.password(email).subscribe((resp) => {
      console.log(resp)
        let toast = this.toastCtrl.create({
        message: "Enlace enviado. Por favor, revisa tu correo.",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }, (err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: "Error al enviar el mensaje",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */

}
