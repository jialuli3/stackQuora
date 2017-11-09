import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StackMockProvider} from '../../providers/stack-mock/stack-mock'

/**
 * Generated class for the DisplayQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-question',
  templateUrl: 'display-question.html',
})
export class DisplayQuestionPage {
  question :any;
  answers: any;
  qid: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mockData: StackMockProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayQuestionPage');
    this.qid=this.navParams.get('data');
    console.log(this.qid);
    this.content=this.mockData.displayQuestionAnswers(this.qid,1).subscribe(data=>{
      this.question=data.question;
      this.answers=data.answers;
      //console.log(data);
      console.log("question",this.question);
      console.log("answers",this.answers);
    });
  }

}
