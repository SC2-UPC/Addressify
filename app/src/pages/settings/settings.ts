import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams,ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Settings, User} from '../../providers/providers';
import { AlertController, App } from 'ionic-angular';
import {FirstRunPage} from "../pages";

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  rootPage=FirstRunPage;

  // Our local settings object
  options: any;

  settingsReady = false;

  //form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = SettingsPage;

  private currentUser:any={};
  private img;
  constructor(public navCtrl: NavController,
    public user: User,
    public modalCtrl: ModalController,
    public settings: Settings,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    private storage:Storage,
    private app:App,
    private alertCtrl: AlertController) {
    this.storage.get('user').then((resp) => {
      this.currentUser = resp;
    });

  }

  deleteUser() {
    let alert = this.alertCtrl.create({
      title: 'Eliminar usuario',
      message: '¿Estás seguro que quieres borrar tu cuenta?',
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
            let user:any;
            this.storage.get('user').then((resp) => {
              user=resp;
              console.log(user);
              this.user.deleteuser(user).subscribe((resp) => {
                let toast = this.toastCtrl.create({
                  message: "Usuario borrado",
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
                this.storage.clear();
                this.app.getRootNav().setRoot(this.rootPage)

              }, (err) => {
                // Unable to log in
                let toast = this.toastCtrl.create({
                  message: "Error al borrar el usuario",
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
              });
            });
          }

        }
      ]
    });
    alert.present();
  }

  openEdit(){
    let addModal = this.modalCtrl.create('UpdatePage');
    addModal.onDidDismiss(update => {
      if (update) {
        let user:any;
        this.storage.get('user').then((resp) => {
          user=resp;
          this.user.update(update,user).subscribe((resp) => {
            let newUser:any;
            newUser=resp;
            this.currentUser=newUser;
            this.storage.set('user', newUser);
            let toast = this.toastCtrl.create({
              message: "Usuario actualizado",
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }, (err) => {
            // Unable to log in
            let toast = this.toastCtrl.create({
              message: "Error al actualizar",
              duration: 3000,
              position: 'top'
            });
            toast.present();
          });
        })
      }
    })
    addModal.present();
  }

  cerrarSesion(){

    let alert = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: '¿Estás seguro que quieres cerrar sesión?',
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
            this.storage.clear();
            this.app.getRootNav().setRoot(this.rootPage);
          }

        }
      ]
    });

    alert.present();
  }

  openContact(){
    let addModal = this.modalCtrl.create('ContactPage');
    addModal.onDidDismiss(message => {
      if (message) {
        console.log("Ok")
      }
    })
    addModal.present();
  }
}
