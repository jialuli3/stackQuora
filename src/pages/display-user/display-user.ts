import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API } from '../../providers/API';
import { StackMockProvider} from '../../providers/stack-mock/stack-mock';


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
  constructor(public navCtrl: NavController, public navParams: NavParams, public mockData: StackMockProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayUserPage');
    this.currUserID=API.userID;
    this.mockData.getUserStatus(this.currUserID,1).map(res=>res.json()).subscribe(data=>{
      this.content=data;
      console.log(data);
    });
  }

  getFollowingStatus(){
    this.mockData.getFollowingStatus(this.currUserID,[this.content.userName]).subscribe(data=>{
      this.followingStatus=data.following_results;
    });
  }
}
