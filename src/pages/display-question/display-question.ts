import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StackMockProvider} from '../../providers/stack-mock/stack-mock';
import { AnswerQuestionPage} from '../answer-question/answer-question';
import { API } from '../../providers/API';
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
  my_answer =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public mockData: StackMockProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayQuestionPage');
    this.qid=this.navParams.get('data');
    console.log(this.qid);
    this.mockData.displayQuestionAnswers(this.qid,1).subscribe(data=>{
      this.question=data.question;
      this.answers=data.answers;
      for (let i in this.answers){
          if(this.answers[i].userID==API.userID){
            my_answer.push(true);
          }
          else{
            my_answer.push(false);
          }
        }
      //console.log(data);
      console.log("question",this.question);
      console.log("answers",this.answers);
    });
  }

  answerQuestion(){
    this.navCtrl.push(AnswerQuestionPage,{
      question:this.question
    });
  }

}
