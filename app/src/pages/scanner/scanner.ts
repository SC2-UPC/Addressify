import { Component } from '@angular/core';
import { IonicPage, ModalController, ViewController, NavController, ToastController } from 'ionic-angular';

import { MainPage } from "../pages";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';


@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html'
})
export class ScannerPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private qrScanner: QRScanner, public toastCtrl: ToastController, public viewCtrl: ViewController) {


  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
      scanSub.unsubscribe(); // stop scanning
      this.qrScanner.hide();
      this.viewCtrl.dismiss(text);
    });
    this.qrScanner.show();
  }


}