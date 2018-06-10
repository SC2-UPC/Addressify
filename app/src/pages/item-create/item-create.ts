import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import {IonicPage, NavController, ViewController, NavParams, ToastController, AlertController} from 'ionic-angular';
import { Items } from '../../providers/providers';
@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  item: any;
  token: any;
  rating: { title: string, comment: string, rate: string} = {
    title: '',
    comment: '',
    rate:'10'
  };


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public items: Items) {

  }

  createitem(){
    let alert = this.alertCtrl.create({
      title: 'Añadir valoracion',
      message: '¿Estás seguro que quieres añadir esta valoración?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Has cancelado la valoracion');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log(this.rating)
            this.viewCtrl.dismiss(this.rating);
          }

        }
      ]
    });
    alert.present();
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
