import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { StackMockProvider } from '../../providers/stack-mock/stack-mock';
import { DisplayQuestionPage } from '../display-question/display-question';
import { API } from '../../providers/API';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  query:any;
  relevant:any;
  recommended:any;
  loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public mockData:StackMockProvider,public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  search(){
    this.presentLoading()
    this.mockData.search(this.query).map(res=>res.json()).subscribe(data=>{
      console.log(data);
      this.relevant=data.relevant_questions;
      this.recommended=data.recommended_questions;
      this.loader.dismiss();
    });
  }

  displayRelevantQuestion(i){
    this.navCtrl.push(DisplayQuestionPage,{
      data:JSON.stringify(this.relevant[i].qID),
      question_color: 0,
      type:API.QUESTION
    });
  }
  displayRecommendQuestion(i){
    this.navCtrl.push(DisplayQuestionPage,{
      data:JSON.stringify(this.recommended[i].qID),
      question_color: 0,
      type:API.QUESTION
    });
  }

  presentLoading() {
   this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }
}
