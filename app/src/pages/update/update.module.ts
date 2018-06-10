import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { UpdatePage } from './update';

@NgModule({
  declarations: [
    UpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePage),
    TranslateModule.forChild()
  ],
  exports: [
    UpdatePage
  ]
})
export class UpdatePageModule { }
