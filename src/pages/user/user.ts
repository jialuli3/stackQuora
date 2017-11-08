import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyQuestionsAnswersPage } from '../my-questions-answers/my-questions-answers';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})


export class UserPage {
  constructor(public navCtrl: NavController) {

  }
displayMyQAs(){
  this.navCtrl.push(MyQuestionsAnswersPage)
}
}
