import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class Items {
  items: Item[] = [];

  constructor(public api: Api) {

  }

  query() {
    let seq =this.api.get('products/all')
    return seq;
  }
  addreport(idproduct, idrating, newreport: any, token: any){
    let body= newreport;
    let headers= new HttpHeaders();
    console.log(idrating)
    headers = headers.append('Authorization', token);
    let seq = this.api.post(`products/rating/report/`+idproduct+`/`+idrating, body, {headers:headers}).share();
    seq.subscribe((res: any)=>{
      if (res.status=='success'){
        console.log("ok");
      }
    }, err=>{
      console.error('ERROR', err);
    });
    return seq;
  }
  addrating(idproduct, rating: any, token: any){
    let body=rating;
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", token);
    let seq = this.api.post(`products/rating/`+idproduct, body, {headers:headers}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        console.log("ok");
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;

  }

  dislikeButton(idproduct, idrating, token: any) {
    let headers= new HttpHeaders();
    headers = headers.append("Authorization", token);
    let seq = this.api.post(`products/rating/dislike/`+ idproduct + `/` +idrating, null,{headers:headers}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        console.log("ok");
      }
    }, (err) => {
      console.error('ERROR', err);
    });
    return seq;


  }
  likeButton(idproduct, idrating, token: any) {
    let headers= new HttpHeaders();
    headers = headers.append("Authorization", token);
    let seq = this.api.post(`products/rating/like/`+ idproduct + `/` +idrating, null,{headers:headers}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        console.log("ok");
      }
    }, (err) => {
      console.error('ERROR', err);
    });
    return seq;


  }

  itemdetail(itemid: any) {
    let seq =this.api.get(`products/id/`+itemid)
    return seq;
  }
  allbest(){
    let seq =this.api.get('products/best7')
    return seq;
  }
  desktopbest(){
    let seq =this.api.get('products/category/best7/desktop')
    return seq;
  }
  laptopbest(){
    let seq =this.api.get('products/category/best7/laptop')
    return seq;
  }
  tabletbest(){
    let seq =this.api.get('products/category/best7/tablet')
    return seq;
  }
  phonebest(){
    let seq =this.api.get('products/category/best7/phone')
    return seq;
  }
  accessoriesbest(){
    let seq =this.api.get('products/category/best7/accessories')
    return seq;
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
