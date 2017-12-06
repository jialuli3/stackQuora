import { Component, ViewChild } from '@angular/core';
import { NavController, Content, LoadingController,IonicPage } from 'ionic-angular';
import { AskQuestionPage} from '../ask-question/ask-question';
import { DisplayQuestionPage } from '../display-question/display-question';
import { DisplayUserPage } from '../display-user/display-user';
import { SearchPage } from '../search/search';
import { StackMockProvider} from '../../providers/stack-mock/stack-mock';
import { StorageProvider} from '../../providers/storage/storage';

import { API } from '../../providers/API';

@IonicPage({
  name:"HomePage"
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  contents: any;
  voted_status: any;
  loader:any;
  followingStatus= [];
  userID:any;
  upvotes_without_user: Array<number> = [0,0,0,0,0,0,0,0,0,0];
  downvotes_without_user: Array<number> = [0,0,0,0,0,0,0,0,0,0];
  up_buttonColor: Array<string> =['green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2'];
  down_buttonColor: Array<string> =['green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2'];
  comment_buttonColor: string ='green_l2';
  upvote_add: Array<number> = [0,0,0,0,0,0,0,0,0,0];
  downvote_min: Array<number> = [0,0,0,0,0,0,0,0,0,0];
  qIDs=[];
  ownerIDs=[];
  @ViewChild('myContent') contentArea;
  constructor(public navCtrl: NavController, private mockData: StackMockProvider, public loadingCtrl:LoadingController, public storage:StorageProvider) {

  }

  ionViewWillEnter(){
    this.contentArea.resize();
  }
  ionViewDidLoad(){
    this.presentLoading()
    this.load_content();
    //this.initial_voted_status();
  }

  load_content(){
    this.userID=this.storage.getUserID()
    this.mockData.getUserTimeline().subscribe(data=>{
      console.log(data);
      this.contents=data.contents;
      this.getVotedStatus();
      this.getFollowingStatus();
    });


  }

  getFollowingStatus(){
    this.mockData.getFollowingStatus(this.userID,this.ownerIDs).map(res=>res.json()).subscribe(data=>{
      this.followingStatus=[];
      this.followingStatus=data.following_results;
      console.log(this.followingStatus)
    });
  }

  updateFollowers(i,followingType){
    this.mockData.updateFollowers(this.userID,this.contents[i].owneruserid,String(followingType)).subscribe(data=>{
      console.log("update followers",data);
      this.getFollowingStatus();
    });


  }

  getVotedStatus(){
    this.upvote_add = [0,0,0,0,0,0,0,0,0,0];
    this.downvote_min= [0,0,0,0,0,0,0,0,0,0];
    this.up_buttonColor =['green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2'];
    this.down_buttonColor=['green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2'];
    this.qIDs=[]
    this.ownerIDs=[]
    for (let i in this.contents){
        this.qIDs.push(String(this.contents[i].qID));
        this.ownerIDs.push(String(this.contents[i].owneruserid));
    }
    this.mockData.getVotedStatus(this.userID,this.qIDs,[]).map(res => res.json()).subscribe(data=>{
      this.voted_status=data.question_voted_status;
      console.log(this.voted_status)
      for (let i in this.voted_status){
        //console.log(this.voted_status[i])
        this.upvotes_without_user[i]=this.contents[i].upvotes;
        this.downvotes_without_user[i]=this.contents[i].downvotes;
        if (this.voted_status[i]==1){
          this.up_buttonColor[i]='green_d3';
          this.upvotes_without_user[i]-=1;
          this.upvote_add[i]=1;
        }
        else if(this.voted_status[i]==-1){
          this.down_buttonColor[i]='green_d3';
          this.downvotes_without_user[i]-=1;
          this.downvote_min[i]=1;
        }
      }
      this.loader.dismiss();
    });
  }

  doRefresh(refresher){
    this.load_content();
    refresher.complete();

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
    this.mockData.updateVotedStatus(this.contents[i].qID,0,this.userID,this.voted_status[i]+1);
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
    this.mockData.updateVotedStatus(this.contents[i].qID,0,this.userID,this.voted_status[i]+1);

  }

  displayUser(i){
    this.navCtrl.push(DisplayUserPage,{
      userID:this.contents[i].owneruserid
    })
  }
  displayQuestion(i){
    console.log(this.voted_status)
      this.navCtrl.push('DisplayQuestionPage',{
        data:JSON.stringify(this.contents[i].qID),
        question_color: this.voted_status[i],
        type:API.QUESTION
      });
  }
  askQuestion(){
      this.navCtrl.push(AskQuestionPage);
  }
  search(){
      this.navCtrl.push(SearchPage);
  }

  presentLoading() {
   this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }
}
