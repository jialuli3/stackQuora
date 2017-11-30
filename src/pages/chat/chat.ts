import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

    username: string = 'me';
    message: any;
    text_input: string="";
    messages =[];

    constructor(
      public navCtrl: NavController, public navParams: NavParams, public socket:Socket) {
        //this.username = this.navParams.get('username');
        //this._chatSubscription = this.db.list('/chat').subscribe( data => {
          //this.messages = data;
        //});
      }

      /*sendMessage() {
        this.message={
          from:this.username,
          text:this.text_input
        }
        this.messages.push(JSON.stringify(body));
      }

      ionViewDidLoad() {

      }

      ionViewWillLeave(){
        this.socket.disconnect()
      }*/
}
