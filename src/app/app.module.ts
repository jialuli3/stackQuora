import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { NotificationsPage } from '../pages/notifications/notifications';
import { UserPage } from '../pages/user/user';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DisplayQuestionPage } from '../pages/display-question/display-question';
import { AskQuestionPage } from '../pages/ask-question/ask-question';
import { UserLoginPage } from '../pages/user-login/user-login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StackMockProvider } from '../providers/stack-mock/stack-mock';
import { StorageProvider } from '../providers/storage/storage';

@NgModule({
  declarations: [
    MyApp,
    NotificationsPage,
    UserPage,
    HomePage,
    TabsPage,
    DisplayQuestionPage,
    AskQuestionPage,
    UserLoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true,
    }),
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
    UserLoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StackMockProvider,
    StorageProvider
  ]
})
export class AppModule {

}
