import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as io from 'ng-socket-io';

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
    socketHost: string = "http://localhost:3000/";
    socket:any;
    chat:any;


    constructor(
      public navCtrl: NavController, public navParams: NavParams) {
        //this.username = this.navParams.get('username');
        /*this.socket = io.connect(this.socketHost);
        this.zone = new NgZone({enableLongStackTrace: false});
        this.socket.on("chat message", (msg) =>{
          this.zone.run(() =>{
            this.messages.push(msg);
            this.content.scrollToBottom();
          });
        });*/
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
