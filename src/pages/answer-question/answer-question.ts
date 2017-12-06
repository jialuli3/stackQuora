import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API } from '../../providers/API';
import { AlertController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { StackMockProvider } from '../../providers/stack-mock/stack-mock';
import { StorageProvider } from '../../providers/storage/storage'
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
  userID:any;
  @ViewChild('AnswerQuestion') contentArea;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, public http:Http, public storage:StorageProvider, public mockData:StackMockProvider) {
  }
  ionViewWillEnter(){
    this.contentArea.resize();
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

    this.mockData.postAnswer(this.descriptions,String(this.parentID)).subscribe(data=>{
      console.log(data);
    });
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
