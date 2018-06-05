import { Component } from '@angular/core';
declare var require: any;
const rsa = require('../../../../../RSA-js')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ngOnInit() {
    const keys = rsa.getRSAKeys(128);
    const m ="75BCD15"; //123456789
    const c = keys.publicKey.encrypt(m)
    const d = keys.privateKey.decrypt(c)
    const t = parseInt(d,16)
   console.log(t);
  }
}
