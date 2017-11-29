import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

import { NotificationsPage } from '../pages/notifications/notifications';
import { UserPage } from '../pages/user/user';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DisplayQuestionPage } from '../pages/display-question/display-question';
import { AskQuestionPage } from '../pages/ask-question/ask-question';
import { UserLoginPage } from '../pages/user-login/user-login';
import { MyQuestionsAnswersPage } from '../pages/my-questions-answers/my-questions-answers';
import { AnswerQuestionPage } from '../pages/answer-question/answer-question';
import { FollowersFollowingPage } from '../pages/followers-following/followers-following';
import { SearchPage } from '../pages/search/search';
import { DisplayUserPage} from '../pages/display-user/display-user';
import { PopoverPage } from '../pages/popover/popover';
import { EditProfilePage} from '../pages/edit-profile/edit-profile';
import { TenPostsPage} from '../pages/ten-posts/ten-posts';
import { ChatPage } from '../pages/chat/chat'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StackMockProvider } from '../providers/stack-mock/stack-mock';
import { StorageProvider } from '../providers/storage/storage';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    NotificationsPage,
    UserPage,
    HomePage,
    TabsPage,
    DisplayQuestionPage,
    AskQuestionPage,
    UserLoginPage,
    MyQuestionsAnswersPage,
    AnswerQuestionPage,
    FollowersFollowingPage,
    SearchPage,
    DisplayUserPage,
    PopoverPage,
    EditProfilePage,
    TenPostsPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true,
    }),
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationsPage,
    UserPage,
    HomePage,
    TabsPage,
    DisplayQuestionPage,
    AskQuestionPage,
    UserLoginPage,
    MyQuestionsAnswersPage,
    AnswerQuestionPage,
    FollowersFollowingPage,
    SearchPage,
    DisplayUserPage,
    PopoverPage,
    EditProfilePage,
    TenPostsPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StackMockProvider,
    StorageProvider,
    AuthProvider
  ]
})
export class AppModule {

}
