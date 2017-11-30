import { Component } from '@angular/core';
import { NavController,PopoverController } from 'ionic-angular';
import { MyQuestionsAnswersPage } from '../my-questions-answers/my-questions-answers';
import { FollowersFollowingPage } from '../followers-following/followers-following';
import { PopoverPage } from '../popover/popover';
import { API } from '../../providers/API';
import { StackMockProvider } from '../../providers/stack-mock/stack-mock';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})


export class UserPage {
  popover:any;
  userInfo:any;
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public mockData:StackMockProvider) {

  }

  ionViewDidLoad(){
    this.getUserStatus();
  }

  doRefresh(refresher){
    this.getUserStatus();
    refresher.complete();

  }

  presentPopover(myEvent) {
    this.popover = this.popoverCtrl.create(PopoverPage);
    this.popover.present({
      ev:myEvent
    });
  }

getUserStatus(){
  this.mockData.getUserStatus(API.userID,1).map(res=>res.json()).subscribe(data=>{
    this.userInfo=data;
    console.log("userInfo",this.userInfo);
  });
}
  displayMyQAs(){
   this.navCtrl.push(MyQuestionsAnswersPage)
 }

//0 for followers 1 for followings
 checkFollowers(){
   this.navCtrl.push(FollowersFollowingPage,{
     type:0
   })
 }

 checkFollowings(){
   this.navCtrl.push(FollowersFollowingPage,{
     type:1
   })
 }
}
