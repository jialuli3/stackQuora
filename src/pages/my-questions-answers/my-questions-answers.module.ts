import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyQuestionsAnswersPage } from './my-questions-answers';

@NgModule({
  declarations: [
    MyQuestionsAnswersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyQuestionsAnswersPage),
  ],
})
export class MyQuestionsAnswersPageModule {}
