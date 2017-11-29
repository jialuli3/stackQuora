import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StackMockProvider} from '../../providers/stack-mock/stack-mock';
import { API } from '../../providers/API';
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
  UserIDs:any;
  userStatus:any;
  followingStatus:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mockData:StackMockProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowersFollowingPage');
    this.type=this.navParams.get('type');
    console.log(this.type) //0-followers 1-followings
    if(this.type==0){
      this.mockData.checkFollowers(API.userID,0,1).map(res => res.json()).subscribe(data=>{
        this.userIDs=data.uIDs;
        this.userStatus=data.userStatus;
        console.log(this.userIDs)
        this.followingStatus=this.mockData.getFollowingStatus(API.userID,this.userIDs)
      });
    }
    else if (this.type==1){
      this.mockData.checkFollowings(API.userID,0,1).map(res => res.json()).subscribe(data=>{
        this.userIDs=data.uIDs;
        this.userStatus=data.userStatus;
        console.log(this.userIDs)
        this.followingStatus=this.mockData.getFollowingStatus(API.userID,this.userIDs)

      });
    }
  }



}
