import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { NotificationsPage } from '../notifications/notifications';
import { UserPage } from '../user/user';
import { HomePage } from '../home/home';

@IonicPage({
  name:'tabs'
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  /*tab1Root = HomePage;
  tab2Root = NotificationsPage;
  tab3Root = UserPage;*/


    tab1Root = "HomePage";
    tab2Root = "NotificationsPage";
    tab3Root = "UserPage";

  constructor() {

  }
}
