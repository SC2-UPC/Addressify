import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import {Storage} from "@ionic/storage";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { CustomValidators } from 'ng2-validation';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  account: FormGroup;


  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController,
              private fb: FormBuilder,
              public translateService: TranslateService,
              private storage: Storage) {
    this.account = this.fb.group({
      name: ['', [CustomValidators.rangeLength([4, 20]), Validators.required]],
      email: ['', [Validators.required, CustomValidators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 20])]],
      password2: ['', [Validators.required, CustomValidators.rangeLength([6, 20])]]
    })

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {

    if (this.account.valid) {
      if (this.account.value.password != this.account.value.password2) {
        let toast = this.toastCtrl.create({
          message: "Las contraseñas no coinciden",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      else {
        this.user.signup(this.account.value).subscribe((resp) => {
          let user: any;
          user = resp;
          this.storage.set('user', user);
          this.navCtrl.push(MainPage);
        }, (err) => {
          if (err.status == 409) {
            let toast = this.toastCtrl.create({
              message: "Ya existe un usuario con ese nombre",
              duration: 10000,
              position: 'top'
            });
            toast.present();
          } else {
            // Unable to sign up
            let toast = this.toastCtrl.create({
              message: "Lo sentimos, registro inválido",
              duration: 10000,
              position: 'top'
            });
            toast.present();
          }
        });
      }
    }
    else {

      if (!this.account.value.name.valid) {
        let toast = this.toastCtrl.create({
          message: "Rellena bien los campos: El nombre debe tener entre 4 y 20 caracteres, el email debe tener formato de mail y la contraseña debe tener entre 6 y 20 caracteres",
          duration: 9000,
          position: 'top'
        });
        toast.present();


      }


    }
  }
}

