import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayQuestionPage } from './display-question';

@NgModule({
  declarations: [
    DisplayQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayQuestionPage),
  ],
  exports:[DisplayQuestionPage]
})
export class DisplayQuestionPageModule {}
