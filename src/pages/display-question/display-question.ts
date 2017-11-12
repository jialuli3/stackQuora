import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StackMockProvider} from '../../providers/stack-mock/stack-mock';
import { AnswerQuestionPage} from '../answer-question/answer-question';
import { API } from '../../providers/API';
import { Http,Headers } from '@angular/http';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public mockData: StackMockProvider, public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayQuestionPage');
    this.qid=this.navParams.get('data');
    this.getQuestionAnswer();
  }

  getQuestionAnswer(){
    this.mockData.displayQuestionAnswers(36229240,1).subscribe(data=>{
      this.question=data.question;
      this.answers=data.answers;
      this.my_answer=[]
      for (let i in this.answers){
        console.log(String(this.answers[i].authorID),API.userID)
          if(String(this.answers[i].authorID)==API.userID){
            this.my_answer.push(true);
          }
          else{
            this.my_answer.push(false);
          }
        }
      //console.log(data);
      console.log("question",this.question);
      console.log("answers",this.answers);
      console.log(this.my_answer);
    });
  }
  answerQuestion(){
    this.navCtrl.push(AnswerQuestionPage,{
      question:this.question
    });
  }
  doRefresh(refresher){
    this.getQuestionAnswer()
    refresher.complete()
  }

  deleteAnswer(i){
    console.log(API.VM+API.deleteQuestionAnswer+this.answers[i].aid+'/0')
    this.http.get(API.VM+API.deleteQuestionAnswer+this.answers[i].aid+'/0').subscribe(data=>{
      console.log(data);
    });
    this.getQuestionAnswer()
  }
}
