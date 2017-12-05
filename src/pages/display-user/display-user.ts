import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API } from '../../providers/API';
import { StackMockProvider} from '../../providers/stack-mock/stack-mock';
import { DisplayQuestionPage } from '../display-question/display-question';

/**
 * Generated class for the DisplayUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-user',
  templateUrl: 'display-user.html',
})
export class DisplayUserPage {

  currUserID:any;
  content:any;
  followingStatus:any;
  activities:any;
  postDetails:any;
  page=0;
  note=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public mockData: StackMockProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayUserPage');
    this.currUserID=this.navParams.get('userID');
    this.mockData.getUserStatus(this.currUserID,1).map(res=>res.json()).subscribe(data=>{
      this.content=data;
      console.log(data);
    });
    this.getActivities()
  }

  /*getFollowingStatus(){
    this.mockData.getFollowingStatus(this.currUserID,[this.content.userName]).subscribe(data=>{
      this.followingStatus=data.following_results;
    });
  }*/

  displayQuestion(i){
      this.navCtrl.push('DisplayQuestionPage',{
        data:JSON.stringify(this.activities[i].postID),
        question_color: 0,
        type:this.activities[i].postType
      });
  }
  getActivities(){
    this.mockData.getActivities(this.currUserID,2,3,this.page).map(res=>res.json()).subscribe(data=>{
      this.activities=data.recentActivities;
      this.postDetails=data.postDetail;
      this.note=[]
      this.getNote()
      console.log(this.postDetails,this.activities);
    });
  }
    getNote(){
      for (let i in this.activities ){
      if(this.activities[i].actionType==0 && this.activities[i].postType==0){
        this.note.push(" posted a question.")
      }
      else if(this.activities[i].actionType==1 && this.activities[i].postType==0){
        this.note.push(" upvoted a question.")
      }
      else if(this.activities[i].actionType==2 && this.activities[i].postType==0){
        this.note.push(" downvoted a question.")
      }
      else if(this.activities[i].actionType==0 && this.activities[i].postType==1){
        this.note.push(" posted an answer.")
      }
      else if(this.activities[i].actionType==1 && this.activities[i].postType==1){
        this.note.push(" upvoted an answer.")
      }
      else if(this.activities[i].actionType==2 && this.activities[i].postType==1){
        this.note.push(" downvoted an answer.")
      }
    }
    }
  }
