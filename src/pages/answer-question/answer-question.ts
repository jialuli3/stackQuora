import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API } from '../../providers/API';
import { AlertController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';

/**
 * Generated class for the AnswerQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer-question',
  templateUrl: 'answer-question.html',
})
export class AnswerQuestionPage {
  question: any;
  descriptions: any;
  date: any;
  parentID: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerQuestionPage');
    this.question=this.navParams.get('question');
    console.log(this.question);
    this.parentID=this.question.qid;
  }

  submitAnswer(){
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    //this.date=(new Date().getTimezoneOffset()).toISOString()).split('T');
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().split('T');
    this.date=localISOTime[0]+" "+localISOTime[1].slice(0,8);
    console.log(this.date)

    if(typeof this.descriptions==="undefined"){
      this.presentAlert();
      return;
    }

    let body={
      userID:API.userID,
      body:this.descriptions,
      parentID:String(this.parentID)
    };
    //post to url
    let post_content=String("{\"content\":{\"userID\":\""+API.userID+"\",\"body\":\""+String(this.descriptions)+"\",\"parentID\":\""+String(this.parentID)+"\"},}");
    console.log(typeof posted_time)
    this.http.post(API.VM+API.postAnswer,post_content,{headers:headers}).subscribe(data=>{
        console.log(data);
    });
    console.log(post_content);
    this.presentSubmittedAlert();
    this.navCtrl.pop()
  }
  cancelAnswer(){
    this.navCtrl.pop()
  }
  presentAlert() {
  let alert = this.alertCtrl.create({
    message: 'Your answers cannot be empty.',
    buttons: ['OK'],
  });
  alert.present();
}
presentSubmittedAlert() {
let alert = this.alertCtrl.create({
  message: 'congratulations. Your answers successfully submitted.',
  buttons: ['OK'],
});
alert.present();
}
}
