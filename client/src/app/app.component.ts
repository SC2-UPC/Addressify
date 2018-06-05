import { Component } from '@angular/core';
import {QRCodeComponent} from 'angular2-qrcode';

declare var require: any;
const rsa = require('../../../RSA-js')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  d;

  ngOnInit() {
    const keys = rsa.getRSAKeys(128);
    const m ="75BCD15"; //123456789
    const c = keys.publicKey.encrypt(m)
    this.d = keys.privateKey.decrypt(c)
    const t = parseInt(this.d,16)
   console.log(this.d);
  }
}
