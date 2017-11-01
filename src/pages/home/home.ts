import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AskQuestionPage} from '../ask-question/ask-question';
import { DisplayQuestionPage } from '../display-question/display-question'
import { StackMockProvider} from '../../providers/stack-mock/stack-mock'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contents: any;
  up_buttonColor: string ='green_l2';
  down_buttonColor: string ='green_l2';
  comment_buttonColor: string='green_l2';
  voted_status: int = 0;
  upvote_add: int = 0;
  downvote_min: int =0;

  constructor(public navCtrl: NavController, private mockData: StackMockProvider) {

  }

  ionViewDidLoad(){
    console.log("loaded");
    this.mockData.load().subscribe(data=>{
      this.contents=data.contents;
    });
  }
  upvoted(){
    if(this.voted_status==0){
      this.voted_status=1;
      this.upvote_add=1;
      this.up_buttonColor='green_d3';
    }//currently not selected and upvoted
    else if(this.voted_status==1){
      this.voted_status=0;
      this.upvote_add=0;
      this.up_buttonColor='green_l2';
    }//currently upvoted, deselect votes
    else if(this.voted_status==-1){
      this.voted_status=1;
      this.upvote_add=1;
      this.downvote_min=0;
      this.up_buttonColor='green_d3';
      this.down_buttonColor='green_l2'
    }//change from downvote to upvote
  }

  //TO DO: need to update the database
  downvoted(){
    if(this.voted_status==0){
      this.voted_status=-1;
      this.downvote_min=1;
      this.down_buttonColor='green_d3';
    }//currently not selected and downvoted
    else if(this.voted_status==1){
      this.voted_status=-1;
      this.downvote_min=1;
      this.upvote_add=0;
      this.down_buttonColor='green_d3';
      this.up_buttonColor='green_l2';
    }//change from upvoted to downvoted
    else if(this.voted_status==-1){
      this.voted_status=0;
      this.downvote_min=0;
      this.down_buttonColor='green_l2';
    }//deselct downvotes
  }

  displayQuestion(){
      this.navCtrl.push(DisplayQuestionPage);
  }
  askQuestion(){
      this.navCtrl.push(AskQuestionPage);
  }


}
