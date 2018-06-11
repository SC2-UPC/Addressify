import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import {IonicPage, NavController, ViewController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { Items } from '../../providers/providers';
import {Item} from "../../models/item";
import {Storage} from "@ionic/storage";
import {User} from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contact:FormGroup;
  private u;


  constructor(public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController,
              private fb:FormBuilder, private alertCtrl: AlertController, private storage:Storage,
              public toastCtrl: ToastController,public user: User,) {

    this.contact=this.fb.group({
      email:'',
      name:'',
      message:''

    })

    this.storage.get('user').then((resp) => {
        this.u=resp;

        if(this.u){
          this.contact=this.fb.group({
            email:this.u.email,
            name:this.u.name,
            message:''

          })
        }
    });

  }

  send(contact){
    console.log(contact.value)
    let alert = this.alertCtrl.create({
      title: 'Enviar mensaje',
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
            //this.viewCtrl.dismiss(this.update.value);
            this.user.contact(contact).subscribe((resp) => {
              let toast = this.toastCtrl.create({
                message: "Mensaje enviado",
                duration: 3000,
                position: 'top'
              });
              toast.present();
              this.viewCtrl.dismiss();
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
