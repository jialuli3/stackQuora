import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the AskQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ask-question',
  templateUrl: 'ask-question.html',
})

export class AskQuestionPage {

  question:any;
  descriptions:any;
  tags:any;
  date:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskQuestionPage');
  }
  submitQuestion(){
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    this.date=new Date().toISOString();

    let body={
      userID:"1234",
      title:this.question,
      body:this.descriptions,
      tags:this.tags,
      posted_time:this.date
    };
    //post to url
    //this.http.post("",JSON.stringify(body),{headers:headers}).map(res=>res.json()).subscribe(data=>{});
    console.log(JSON.stringify(body))
    //this.navCtrl.pop()
  }
  saveQuestion(){
    //post to url to save questions
  }
  cancelQuestion(){
    //post to url to save questions
    this.navCtrl.pop()
  }
}
