import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import {MainPage} from "../pages";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: any=[{}];
  searchForm: FormGroup;
  private results: any=[{}];
  search: {filter: string, parameter: string}={
    filter: 'all',
    parameter:''
  };

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, private fb: FormBuilder) {
    this.searchForm = fb.group({
      'filter':'all',
      'parameter':''
    });

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    /*this.currentItems=this.items.query();
    console.log("okj:")
    console.log(this.currentItems)*/

    let seq=this.items.query();

    seq.subscribe((res: any) => {
      this.currentItems=res;
      this.results=this.currentItems;
      if (res.status == 'success') {

      } else {

      }
    }, err => {
      console.error('ERROR', err);
    });


  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  private searchProduct(){
    let filter=this.search.filter;
    let param=this.search.parameter;

    if(filter=="all")
      this.showAll();

    else if(filter=='name'){
      this.searchByname(param);
    }
    else if(filter=="order"){
      this.order();
    }
    else if(filter=="company"){
      this.searchBycompany(param);
    }
    else if(filter=="category"){
      this.searchBycategory(param);
    }
  }

  private showAll(){
    this.results=this.currentItems;
  }

  private searchByname(name){
    this.results=this.currentItems.filter(x=>x.name==name);

  }

  private searchBycompany(company){
    this.results=this.currentItems.filter(x=>x.company==company);
  }
  private searchBycategory(category){
    this.results=this.currentItems.filter(x=>x.category==category);
  }
  private order(){
    this.results=this.currentItems.sort(function(a,b){return a.name>b.name});
  }
  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
