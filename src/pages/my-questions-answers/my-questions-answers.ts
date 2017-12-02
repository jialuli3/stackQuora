import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { StackMockProvider} from '../../providers/stack-mock/stack-mock';
import { API } from '../../providers/API';
import { DisplayQuestionPage } from '../display-question/display-question';

/**
 * Generated class for the MyQuestionsAnswersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-questions-answers',
  templateUrl: 'my-questions-answers.html',
})
export class MyQuestionsAnswersPage {
  hide_trash_button=false;
  posts:any;
  activities:any;
  hide_post=[false,false,false,false,false,false,false,false,false,false];
  page=0;
  @ViewChild('MyQuestionsAnswersContent') contentArea;

  constructor(public navCtrl: NavController, public navParams: NavParams,public mockData: StackMockProvider) {
  }
  ionViewWillEnter(){
    this.contentArea.resize();
  }
  ionViewDidLoad() {
    this.getMyQA();
  }
  getMyQA(){
    this.mockData.getActivities(API.userID,API.postType_all,API.actionType_post,this.page).map(res=>res.json()).subscribe(data=>{
      this.posts=data.postDetail;
      this.activities=data.recentActivities;
      console.log(data);
    });
  }

  displayQuestion(i){
    this.navCtrl.push(DisplayQuestionPage,{
      data:JSON.stringify(this.activities[i].postID),
      question_color: 0,
      type:this.activities[i].postType
    });
  }
  show_deletion(){
    console.log("show deletion")
    if(this.hide_trash_button===true){
      this.hide_trash_button=false;
    }
    else{
      this.hide_trash_button=true;
    }
    console.log(this.hide_trash_button)
  }
  delete_post(i){
    this.hide_post[i]=true;
    //delete question/answer/API
    this.mockData.deleteQuestionAnswer(this.posts[i].postID,this.activities[i].postType).subscribe(data=>{
      console.log("deletion",data);
      this.getMyQA();
    });
  }
}
