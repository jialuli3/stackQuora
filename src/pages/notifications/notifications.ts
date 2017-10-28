import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { StackMockProvider } from '../../providers/stack-mock/stack-mock'


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  contents:any;
  tags:any;
  constructor(public navCtrl: NavController, public mockData: StackMockProvider, private http:Http) {
    this.http.get('assets/mockData/mockData.json').map(res => res.json()).subscribe(data => {
            this.contents = data.contents;
            this.tags=data.contents.tags;
            console.log(this.contents);
            console.log(this.tags);
          });
  }

}