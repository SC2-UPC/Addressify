import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { User } from '../../providers/providers';
import 'rxjs/add/operator/map';


declare var require: any;
const rsa = require('../../rsa-module/rsa');
const crypto = require('crypto')

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {

  show = true;
  kpriv;
  pubA;
  IDP;
  IDA;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public toastCtrl: ToastController, private storage: Storage, public user: User) {


  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.storage.get('user').then((data) => {
      this.kpriv = rsa.privateKey(data.point.kpriv);
      this.pubA = rsa.publicKey(data.publicA)
      this.IDP = data.point._id;
      this.IDA = data.IDA;
    });
  }

  receive() {
    let text;
    let addModal = this.modalCtrl.create('ScannerPage');
    this.showCamera();
    addModal.onDidDismiss(data => {
      this.show = true;
      this.hideCamera();
      if (data) {
        text = data;
        const splitted = text.split(',');
        const IDO = splitted[2];
        const c = splitted[3];
        const po = splitted[4];
        const array = new Array(this.IDA, this.IDP, c);
        const concat = array.join(',');
        const check = this.pubA.checkProof(concat, po);
        if (check) {
          const pr = this.kpriv.generateProof(concat);
          const send = {
            IDA: this.IDA,
            IDP: this.IDP,
            IDO: IDO,
            C: c,
            PR: pr
          }

          this.user.arrived(send).subscribe((resp) => {
            let toast = this.toastCtrl.create({
              message: "Paquete recibido!",
              duration: 5000,
              position: 'top'
            });
            toast.present();
          }, (err) => {
            // Unable to log in
            if (err.status == 404) {
              let toast = this.toastCtrl.create({
                message: "Objeto no existente",
                duration: 3000,
                position: 'top'
              });
              toast.present();
            } else if (err.status == 412) {
              let toast = this.toastCtrl.create({
                message: "Verificación incorrecta",
                duration: 3000,
                position: 'top'
              });
              toast.present();
            }
            else {
              // Unable to sign up
              let toast = this.toastCtrl.create({
                message: "Lo sentimos, no se ha podido verificar",
                duration: 3000,
                position: 'top'
              });
              toast.present();
            }
          });

        }
        else {
          let toast = this.toastCtrl.create({
            message: "Verificación incorrecta",
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      }
    })
    this.show = false;
    addModal.present();
  }

  deliver() {
    let text;
    let addModal = this.modalCtrl.create('ScannerPage');
    this.showCamera();
    addModal.onDidDismiss(data => {
      this.show = true;
      this.hideCamera();
      if (data) {
        text = data;
        const splitted = text.split(',');
        const IDO = splitted[0];
        console.log("Ido", IDO);
        const c = splitted[1];
        console.log(c);
        const key = rsa.privateKey({ d: splitted[2], n: splitted[3] })
        const d = key.decrypt(c);
        console.log("d", d)

        if (d == IDO) {
          const array = new Array(this.IDA, this.IDP, c);
          const concat = array.join(',');
          const pe = key.generateProof(concat)
          const send = {
            IDA: this.IDA,
            IDP: this.IDP,
            IDO: IDO,
            C: c,
            PE: pe
          }
          this.user.delivered(send).subscribe((resp) => {
            let toast = this.toastCtrl.create({
              message: "Paquete entregado!",
              duration: 5000,
              position: 'top'
            });
            toast.present();
          }, (err) => {
            // Unable to log in
            if (err.status == 404) {
              let toast = this.toastCtrl.create({
                message: "Objeto no existente",
                duration: 3000,
                position: 'top'
              });
              toast.present();
            } else if (err.status == 412) {
              let toast = this.toastCtrl.create({
                message: "Verificación incorrecta",
                duration: 3000,
                position: 'top'
              });
              toast.present();
            }
            else {
              // Unable to sign up
              let toast = this.toastCtrl.create({
                message: "Lo sentimos, no se ha podido verificar",
                duration: 3000,
                position: 'top'
              });
              toast.present();
            }
          });
        }
        else {
          let toast = this.toastCtrl.create({
            message: "Verificación incorrecta",
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }

      }
    })
    this.show = false;
    addModal.present();
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }
}
