import { Component } from '@angular/core';
import { QRCodeComponent } from 'angular2-qrcode';
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';

declare var require: any;
const rsa = require('../../../RSA-js');

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedProvince: any = 1;
  selectedPoint;
  showConfirm = false;
  points = {};
  qrVendor;
  qrBuyer;
  provinces = ["A coruña", "Alava", "Albacete", "Alicante", "Almeria", "Asturias", "Avila", "Badajoz", "Baleares", "Barcelona", "Burgos", "Caceres", "Cadiz", "Cantabria", "Castellon", "Ceuta", "Ciudad real", "Cordoba", "Cuenca", "Girona", "Granada", "Guadalajara", "Guipuzcoa", "Huelva", "Huesca", "Jaen", "La rioja", "Las palmas", "Leon", "Lleida", "Lugo", "Madrid", "Malaga", "Melilla", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca", "Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza"]


  constructor(private http: Http, private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
  }

  onChange($event) {
    this.http.get(`http://localhost:3000/point/all`)
      //.map((res: Response) => res.json())
      .subscribe(data => {
        this.points = JSON.parse(data['_body']);
        //console.log(this.points)
      });
  }

  onRadioChange(point) {
    this.selectedPoint = point;
  }

  next() {
    let a = document.getElementById("next")
    a.style.backgroundColor = "#3498db";
    a.style.color = "white";
    this.showConfirm = true;
  }

  confirm() {
    this.spinner.show();
    this.http.get(`http://localhost:3003/id`)
      //.map((res: Response) => res.json())
      .subscribe(data => {
        const id = JSON.parse(data['_body']).id;
        //console.log(this.points)
        const keys = rsa.getRSAKeys(512);
        const order = {
          "IdO": id,
          "IdPoint": this.selectedPoint._id,
          "kPub": keys.publicKey
        }
        this.http.post(`http://localhost:3000/order/new`, order)
          //.map((res: Response) => res.json())
          .subscribe(data => {
            const resp=JSON.parse(data['_body']).response;
            console.log(resp);
            console.log(keys.privateKey)
            this.qrVendor=String(resp);
            const array = new Array(keys.privateKey.e, keys.privateKey.n);
            this.qrBuyer=array.join(',');
            this.spinner.hide();
          });
      });
  }
}
