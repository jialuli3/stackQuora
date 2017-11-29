import { Component } from '@angular/core';
import { NavController,PopoverController } from 'ionic-angular';
import { MyQuestionsAnswersPage } from '../my-questions-answers/my-questions-answers';
import { FollowersFollowingPage } from '../followers-following/followers-following';
import { PopoverPage } from '../popover/popover';
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})


export class UserPage {
  popover:any;
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {

  }
  presentPopover(myEvent) {
    this.popover = this.popoverCtrl.create(PopoverPage);
    this.popover.present({
      ev:myEvent
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
