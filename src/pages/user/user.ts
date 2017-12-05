import { Component } from '@angular/core';
import { NavController,PopoverController,AlertController,IonicPage,App } from 'ionic-angular';
import { MyQuestionsAnswersPage } from '../my-questions-answers/my-questions-answers';
import { FollowersFollowingPage } from '../followers-following/followers-following';
import { UserLoginPage } from '../user-login/user-login';
import { PopoverPage } from '../popover/popover';
import { API } from '../../providers/API';
import { StackMockProvider } from '../../providers/stack-mock/stack-mock';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage({
  name:"UserPage"
})
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})


export class UserPage {
  popover:any;
  userInfo:any;
  userID:any;
  alert:any;
  constructor(private app:App,public navCtrl: NavController, public alertCtrl:AlertController,public popoverCtrl: PopoverController, public mockData:StackMockProvider, public storage:StorageProvider) {

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

logout(){
  let userID="";
  let token="";
  this.storage.getKey("userInfo").then((value)=>{
    this.mockData.logout(value[0],value[1]).subscribe(data=>{
      console.log(data)
      this.storage.setKey("isLogged",false);
      this.storage.setKey("userInfo",["",""])
      this.storage.setKey("account",["",""]);
      //this.navCtrl.push(UserLoginPage);
      this.app.getRootNav().setRoot("UserLoginPage")
      this.showAlert('Successfully log out!')
    },error=>{
      this.showAlert(error);
    })
  });
}

getUserStatus(){
  this.userID=this.storage.getUserID();
  this.mockData.getUserStatus(this.userID,1).map(res=>res.json()).subscribe(data=>{
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
 showAlert(alertTitle) {
  this.alert = this.alertCtrl.create({
    title:'',
    subTitle: alertTitle,
    buttons: ['OK']
  });
  this.alert.present();
}
}
