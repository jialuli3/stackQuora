import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


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
  tags_array:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskQuestionPage');
  }
  submitQuestion(){
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    //this.date=(new Date().getTimezoneOffset()).toISOString()).split('T');
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().split('T');
    this.date=localISOTime[0]+" "+localISOTime[1].slice(0,8);
    console.log(this.date)
    if((typeof this.question==="undefined") || (typeof this.descriptions==="undefined")){
      this.presentAlert();
      return;
    }

    if(typeof this.tags!=="undefined"){
      this.tags_array=this.tags.split(",");
      //console.log(tags_array)
    }
    else{
      this.tags_array="[]"
      //this.presentAlert()
    }
    let body={
      userID:"1234",
      title:this.question,
      body:this.descriptions,
      tags:this.tags_array,
      posted_time:this.date
    };
    //post to url
    //this.http.post("",JSON.stringify(body),{headers:headers}).map(res=>res.json()).subscribe(data=>{});
    console.log(JSON.stringify(body))
    this.navCtrl.pop()
  }
  saveQuestion(){
    //post to url to save questions
  }
  cancelQuestion(){
    //post to url to save questions
    this.navCtrl.pop()
  }
  presentAlert() {
  let alert = this.alertCtrl.create({
    message: 'Title/descriptions of the question cannot be empty.',
    buttons: ['OK'],
  });
  alert.present();
}

}
