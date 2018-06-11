import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {


  rankings: any = [];
  allbest: any=[{}];
  desktopbest: any=[{}];
  laptopbest: any=[{}];
  tabletbest: any=[{}];
  phonebest: any=[{}];
  accessoriesbest: any=[{}];

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) {
    this.rankings="all"
    this.charge();

  }

  /**
   * Perform a service for the proper items.
   *//*
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  charge(){
    let seq1=this.items.allbest();
    let seq2=this.items.desktopbest();
    let seq3=this.items.laptopbest();
    let seq4=this.items.tabletbest();
    let seq5=this.items.phonebest();
    let seq6=this.items.accessoriesbest();

    seq1.subscribe((res: any) => {
      this.allbest=res;
      if (res.status == 'success') {

      } else {

      }
    }, err => {
      console.error('ERROR', err);
    });
    seq2.subscribe((res: any) => {
      this.desktopbest=res;
      if (res.status == 'success') {

      } else {

      }
    }, err => {
      console.error('ERROR', err);
    });
    seq3.subscribe((res: any) => {
      this.laptopbest=res;
      if (res.status == 'success') {

      } else {

      }
    }, err => {
      console.error('ERROR', err);
    });
    seq4.subscribe((res: any) => {
      this.tabletbest=res;
      if (res.status == 'success') {

      } else {

      }
    }, err => {
      console.error('ERROR', err);
    });
    seq5.subscribe((res: any) => {
      this.phonebest=res;
      if (res.status == 'success') {

      } else {

      }
    }, err => {
      console.error('ERROR', err);
    });
    seq6.subscribe((res: any) => {
      this.accessoriesbest=res;
      if (res.status == 'success') {

      } else {

      }
    }, err => {
      console.error('ERROR', err);
    });
  }
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}
