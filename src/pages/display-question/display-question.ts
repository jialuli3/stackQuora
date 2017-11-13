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
  downvoted_min_q=0;
  upvoted_add_q=0;
  upvotes_without_user_q=0;
  downvotes_without_user_q=0;
  up_buttonColor_q ='green_l1';
  down_buttonColor_q='green_l1';
  voted_status_q=0;

  upvotes_without_user=[];
  downvotes_without_user=[];
  upvote_add=[];
  downvote_min=[];
  up_buttonColor=[];
  down_buttonColor=[];
  voted_status=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public mockData: StackMockProvider, public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayQuestionPage');
    this.qid=this.navParams.get('data');
    this.voted_status_q=this.navParams.get('question_color');
    this.getQuestionAnswer();


  }

  getVotedStatus(){
    this.upvotes_without_user_q=0;
    this.downvotes_without_user_q=0;
    this.upvoted_add_q=0;
    this.downvoted_min_q=0;
    this.up_buttonColor_q ='green_l2';
    this.down_buttonColor_q='green_l2';
    if(this.voted_status_q==1){
      this.up_buttonColor_q="green_d3";
      this.upvotes_without_user_q=this.question.upvotes-1;
      this.upvoted_add_q=1;
    }
    else if(this.voted_status_q==-1){
      this.down_buttonColor_q="green_d3";
      this.upvotes_without_user_q=this.question.downvotes-1;
      this.downvoted_min_q=1;
    }
  }

  upvoted_q(){
    //console.log(i,this.voted_status[i])
    if(this.voted_status_q==0){
      this.voted_status_q=1;
      this.upvoted_add_q=1;
      this.up_buttonColor_q='green_d3';
    }//currently not selected and upvoted
    else if(this.voted_status_q==1){
      this.voted_status_q=0;
      this.upvoted_add_q=0;
      this.up_buttonColor_q='green_l2';
    }//currently upvoted, deselect votes
    else if(this.voted_status_q==-1){
      this.voted_status_q=1;
      this.upvoted_add_q=1;
      this.downvoted_min_q=0;
      this.up_buttonColor_q='green_d3';
      this.down_buttonColor_q='green_l2'
    }//change from downvote to upvote
    this.mockData.updateVotedStatus(this.qid,0,API.userID,this.voted_status_q+1);
  }

  //TO DO: need to update the database
  downvoted_q(){
    if(this.voted_status_q==0){
      this.voted_status_q=-1;
      this.downvoted_min_q=1;
      this.down_buttonColor_q='green_d3';
    }//currently not selected and downvoted
    else if(this.voted_status_q==1){
      this.voted_status_q=-1;
      this.downvoted_min_q=1;
      this.upvoted_add_q=0;
      this.down_buttonColor_q='green_d3';
      this.up_buttonColor_q='green_l2';
    }//change from upvoted to downvoted
    else if(this.voted_status_q==-1){
      this.voted_status_q=0;
      this.downvoted_min_q=0;
      this.down_buttonColor_q='green_l2';
    }//deselct downvotes
    this.mockData.updateVotedStatus(this.qid,0,API.userID,this.voted_status_q+1);

  }

  getQuestionAnswer(){
    this.mockData.displayQuestionAnswers(this.qid,1).subscribe(data=>{
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
      this.getVotedStatus();
    });
  }


  answerQuestion(){
    this.navCtrl.push(AnswerQuestionPage,{
      question:this.question,
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
