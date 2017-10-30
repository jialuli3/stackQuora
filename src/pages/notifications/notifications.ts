import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
//import { Http } from '@angular/http';
import { DisplayQuestionPage} from '../display-question/display-question';

import { StackMockProvider } from '../../providers/stack-mock/stack-mock';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
  providers:[StackMockProvider]
})
export class NotificationsPage {

  contents:any;
  /*constructor(public navCtrl: NavController, public mockData: StackMockProvider, private http:Http) {
    this.http.get('assets/mockData/mockData.json').map(res => res.json()).subscribe(data => {
            this.contents = data.contents;
          });
  }*/
  constructor(public navCtrl: NavController, private mockData: StackMockProvider,public loadingCtrl: LoadingController){

  }

  ionViewDidLoad(){
    console.log("loaded");
    this.mockData.load().subscribe(data=>{
      this.contents=data.contents;
    });
  }

  displayQuestion(){
    this.navCtrl.push(DisplayQuestionPage);
  }
}
