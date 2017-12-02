import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AskQuestionPage } from '../pages/ask-question/ask-question';
import { DisplayQuestionPage } from '../pages/display-question/display-question';
import { TabsPage } from '../pages/tabs/tabs';
import { UserLoginPage } from '../pages/user-login/user-login';
import { UserPage } from '../pages/user/user';
import { HomePage } from '../pages/home/home';
import { MyQuestionsAnswersPage} from '../pages/my-questions-answers/my-questions-answers';
import { FollowersFollowingPage } from '../pages/followers-following/followers-following';
import { DisplayUserPage} from '../pages/display-user/display-user';
import { EditProfilePage} from '../pages/edit-profile/edit-profile';
import { ChatPage } from '../pages/chat/chat';

import { StorageProvider } from '../providers/storage/storage';
import { StackMockProvider } from '../../providers/stack-mock/stack-mock';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = UserLoginPage;
  //rootPage:any = ChatPage;
  //rootPage:any = DisplayUserPage;
  //rootPage:any = FollowersFollowingPage;
  //rootPage:any = MyQuestionsAnswersPage;
  //rootPage:any= DisplayQuestionPage;
  //rootPage:any = AskQuestionPage;
  //rootPage:any = UserLoginPage;
  //rootPage:any=EditProfilePage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage:StorageProvider) {
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
    });
  }
}
