import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AskQuestionPage} from '../ask-question/ask-question';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  askQuestion(){
      this.navCtrl.push(AskQuestionPage);
  }
}
