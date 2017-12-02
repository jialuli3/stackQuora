import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
//import { Http } from '@angular/http';
import { DisplayQuestionPage} from '../display-question/display-question';
import { DisplayUserPage } from '../display-user/display-user';
import { StackMockProvider } from '../../providers/stack-mock/stack-mock';
import { API } from '../../providers/API';
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
  providers:[StackMockProvider]
})
export class NotificationsPage {

  contents: any;
  voted_status: any;
  activities:any;
  postDetails:any;
  note=[];
  followingStatus=[];
  upvotes_without_user: Array<number> = [0,0,0,0,0,0,0,0,0,0];
  downvotes_without_user: Array<number> = [0,0,0,0,0,0,0,0,0,0];
  up_buttonColor: Array<string> =['green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2'];
  down_buttonColor: Array<string> =['green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2'];
  comment_buttonColor: string ='green_l2';
  //voted_status: Array<number> = [0,0,0,0,0,0,0,0,0,0];
  upvote_add: Array<number> = [0,0,0,0,0,0,0,0,0,0];
  downvote_min: Array<number> = [0,0,0,0,0,0,0,0,0,0];

  constructor(public navCtrl: NavController, private mockData: StackMockProvider) {

  }

  ionViewDidLoad(){
    console.log("loaded");
    this.mockData.getFollowingAcitivites(API.userID,0).map(res=>res.json()).subscribe(data=>{
      this.activities=data.recentActivities;
      this.postDetails=data.postDetail;
      console.log(data);
      this.getNote();
    });
    //this.initial_voted_status();
  }

  /*inital_voted_status(){
    //console.log(this.voted_status)
    for (let i in this.voted_status){
      //console.log(this.voted_status[i])
      if (this.voted_status[i]==1){
        this.up_buttonColor[i]='green_d3';
      }
      else if(this.voted_status[i]==-1){
        this.down_buttonColor[i]='green_d3';
      }
    }
  }*/
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
  upvoted(i){
    //console.log(i,this.voted_status[i])
    if(this.voted_status[i]==0){
      this.voted_status[i]=1;
      this.upvote_add[i]=1;
      this.up_buttonColor[i]='green_d3';
    }//currently not selected and upvoted
    else if(this.voted_status[i]==1){
      this.voted_status[i]=0;
      this.upvote_add[i]=0;
      this.up_buttonColor[i]='green_l2';
    }//currently upvoted, deselect votes
    else if(this.voted_status[i]==-1){
      this.voted_status[i]=1;
      this.upvote_add[i]=1;
      this.downvote_min[i]=0;
      this.up_buttonColor[i]='green_d3';
      this.down_buttonColor[i]='green_l2'
    }//change from downvote to upvote
  }

  //TO DO: need to update the database
  downvoted(i){
    if(this.voted_status[i]==0){
      this.voted_status[i]=-1;
      this.downvote_min[i]=1;
      this.down_buttonColor[i]='green_d3';
    }//currently not selected and downvoted
    else if(this.voted_status[i]==1){
      this.voted_status[i]=-1;
      this.downvote_min[i]=1;
      this.upvote_add[i]=0;
      this.down_buttonColor[i]='green_d3';
      this.up_buttonColor[i]='green_l2';
    }//change from upvoted to downvoted
    else if(this.voted_status[i]==-1){
      this.voted_status[i]=0;
      this.downvote_min[i]=0;
      this.down_buttonColor[i]='green_l2';
    }//deselct downvotes
  }

  displayQuestion(i){
      this.navCtrl.push(DisplayQuestionPage,{
        data:JSON.stringify(this.postDetails[i].postID),
        question_color: 0,
        type:this.activities[i].postType
      });
  }
  displayUser(i){
    this.navCtrl.push(DisplayUserPage,{
      userID:this.postDetails[i].userID
    });
  }
}
