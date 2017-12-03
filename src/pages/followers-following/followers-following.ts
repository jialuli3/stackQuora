import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { StackMockProvider} from '../../providers/stack-mock/stack-mock';
import { StorageProvider} from '../../providers/storage/storage';

import { API } from '../../providers/API';
import { DisplayUserPage } from '../display-user/display-user';

/**
 * Generated class for the FollowersFollowingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-followers-following',
  templateUrl: 'followers-following.html',
})
export class FollowersFollowingPage {

  type:any;
  userID:any;
  userIDs:any;
  userStatus:any;
  followingStatus= ["n","n","n","n","n","n","n","n","n","n"];
  @ViewChild('FollowingContent') contentArea;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mockData:StackMockProvider, public storage:StorageProvider) {
  }

    doRefresh(refresher){
      this.checkFollowersFollowing();
      refresher.complete();

    }


  ionViewWillEnter(){
    this.contentArea.resize();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowersFollowingPage');
    this.type=this.navParams.get('type');
    console.log(this.type) //0-followers 1-followings
    this.checkFollowersFollowing();
  }
  checkFollowersFollowing(){
    this.userID=this.storage.getUserID()
    if(this.type==0){
      this.mockData.checkFollowers(this.userID,0,1).map(res => res.json()).subscribe(data=>{
        this.userIDs=data.uIDs;
        this.userStatus=data.userStatus;
        console.log(this.userIDs)
        this.getFollowingStatus();
      });
    }
    else if (this.type==1){
      this.mockData.checkFollowings(this.userID,0,1).map(res => res.json()).subscribe(data=>{
        this.userIDs=data.uIDs;
        this.userStatus=data.userStatus;
        console.log(data)
        this.getFollowingStatus();
      });
    }
  }

  getFollowingStatus(){
    this.mockData.getFollowingStatus(this.userID,this.userIDs).map(res=>res.json()).subscribe(data=>{
      this.followingStatus=data.following_results;
      console.log(this.followingStatus)
    });
  }

  displayUser(i){
    this.navCtrl.push(DisplayUserPage,{
      userID:this.userIDs[i]
    });
  }
  updateFollowers(i){
    if(this.followingStatus[i]=="y"){
      this.mockData.updateFollowers(this.userID,this.userIDs[i],API.UNFOLLOW).subscribe(data=>{
        console.log("updateFollowers",data)
        this.checkFollowersFollowing()
      });
    }
    else{
      this.mockData.updateFollowers(this.userID,this.userIDs[i],API.FOLLOW).subscribe(data=>{
        this.checkFollowersFollowing()
      });
      }
    }
  }
