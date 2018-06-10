import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ReportRatingPage } from './report-rating';

@NgModule({
  declarations: [
    ReportRatingPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportRatingPage),
    TranslateModule.forChild()
  ],
  exports: [
    ReportRatingPage
  ]
})
export class ReportRatingPageModule { }
