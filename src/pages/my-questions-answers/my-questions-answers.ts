import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StackMockProvider} from '../../providers/stack-mock/stack-mock'

/**
 * Generated class for the MyQuestionsAnswersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-questions-answers',
  templateUrl: 'my-questions-answers.html',
})
export class MyQuestionsAnswersPage {
  hide_trash_button:false;
  contents: any;
  hide_post:Array<boolean> =[false,false,false,false,false,false,false,false,false,false];
  constructor(public navCtrl: NavController, public navParams: NavParams,public mockData: StackMockProvider) {
  }

  ionViewDidLoad() {
    this.mockData.load_contents().subscribe(data=>{
      this.contents=data.contents;
      console.log(this.contents)
    });
  }
  show_deletion(){
    console.log("show deletion")
    if(this.hide_trash_button==true){
      this.hide_trash_button=false;
    }
    else{
      this.hide_trash_button=true;
    }
    console.log(this.hide_trash_button)
  }
  delete_post(i){
    this.hide_post[i]="true";
    //delete question/answer/API
  }
}
