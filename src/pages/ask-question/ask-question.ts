import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the AskQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ask-question',
  templateUrl: 'ask-question.html',
})
export class AskQuestionPage {

  question:any;
  descriptions:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskQuestionPage');
  }
  submitQuestion(){
    //post to url
    this.navCtrl.pop()
  }
  saveQuestion(){
    //post to url to save questions
  }
  cancelQuestion(){
    //post to url to save questions
    this.navCtrl.pop()
  }
}
