import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyQuestionsAnswersPage } from '../my-questions-answers/my-questions-answers';
import { FollowersFollowingPage } from '../followers-following/followers-following';
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})


export class UserPage {
  constructor(public navCtrl: NavController) {

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
