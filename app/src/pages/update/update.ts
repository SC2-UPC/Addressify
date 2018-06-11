import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import {IonicPage, NavController, ViewController, NavParams, AlertController} from 'ionic-angular';
import { Items } from '../../providers/providers';
import {Item} from "../../models/item";

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html'
})
export class UpdatePage {
  update:FormGroup;


  constructor(public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController,
              private fb:FormBuilder, private alertCtrl: AlertController,  ) {

    this.update=this.fb.group({
      email:'',
      name:'',
      password:''

    })

  }

  save(update){
    let alert = this.alertCtrl.create({
      title: 'Editar usuario',
      message: '¿Estás seguro que quieres guardar los cambios?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Tu cuenta sigue activa');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.viewCtrl.dismiss(this.update.value);
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
