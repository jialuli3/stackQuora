import { Component,ViewChild } from '@angular/core';
import { Platform,AlertController,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AskQuestionPage } from '../pages/ask-question/ask-question';
import { DisplayQuestionPage } from '../pages/display-question/display-question';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';
import { HomePage } from '../pages/home/home';
import { MyQuestionsAnswersPage} from '../pages/my-questions-answers/my-questions-answers';
import { FollowersFollowingPage } from '../pages/followers-following/followers-following';
import { DisplayUserPage} from '../pages/display-user/display-user';
import { EditProfilePage} from '../pages/edit-profile/edit-profile';
import { ChatPage } from '../pages/chat/chat';
import { SearchPage } from '../pages/search/search';

import { StorageProvider } from '../providers/storage/storage';
import { StackMockProvider } from '../providers/stack-mock/stack-mock';
import { API } from '../providers/API';
import { Deeplinks } from '@ionic-native/deeplinks';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage:any="tabs";
  //rootPage:any = 'DisplayQuestionPage';
  alert:any;
  userID:any;
  token:any;
  postID:string="27727520";
  rootPage:string="UserLoginPage";
  isLogged:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public alertCtrl:AlertController, public storage:StorageProvider, private deeplinks:Deeplinks, public mockData:StackMockProvider) {
    /*this.storage.getKey('isLogged').then(logged=>{
      if(logged){
        this.rootPage=TabsPage;
      }
      else{
        this.rootPage=UserLoginPage;
      }
    });*/

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();

      this.deeplinks.route({
        '/':{}
      }).subscribe((match)=>{
        //this.showMatchAlert(JSON.stringify(match))
        this.postID=match.$args.postID;
        this.mockData.isLogged().then((res)=>{
          //this.showMatchAlert(String(res));
          if(String(res)=="true"){
            this.userID=this.storage.getUserID();
            this.token=this.storage.getToken();
            //this.showAlert(String(this.userID))
            if(this.postID!="" && this.userID!="" && this.token!=""){
              //this.rootPage="tabs";
              this.nav.push('DisplayQuestionPage',{
                data:String(this.postID),
                question_color: 0,
                type:API.QUESTION
              });
            }
          }
          else{
            this.showAlert(String("You need to log in first."))
          }
        })
        .catch((error)=>{
          //this.showAlert(String(error));
        });
      },(nomatch)=>{
        //this.showAlert(JSON.stringify(nomatch))
        this.rootPage = "UserLoginPage";

      })

    })

   }

   showMatchAlert(alertTitle) {
    this.alert = this.alertCtrl.create({
      title:'match',
      subTitle: alertTitle,
      buttons: ['OK']
    });
    this.alert.present();
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
