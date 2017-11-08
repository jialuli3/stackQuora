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
  voted_status: any;
  home_display: any;
  upvotes_without_user: Array<number> = [0,0,0,0,0,0,0,0,0,0];
  downvotes_without_user: Array<number> = [0,0,0,0,0,0,0,0,0,0];
  up_buttonColor: Array<string> =['green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2'];
  down_buttonColor: Array<string> =['green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2','green_l2'];
  comment_buttonColor: string ='green_l2';
  //voted_status: Array<number> = [0,0,0,0,0,0,0,0,0,0];
  upvote_add: Array<number> = [0,0,0,0,0,0,0,0,0,0];
  downvote_min: Array<number> = [0,0,0,0,0,0,0,0,0,0];

  constructor(public navCtrl: NavController, private mockData: StackMockProvider) {

  }

  ionViewDidLoad(){
    this.home_display="my_questions";
    this.mockData.load_contents().subscribe(data=>{
      console.log("loaded content");
      this.contents=data.contents;
      this.voted_status=data.voted_status;
      console.log(this.voted_status)
      for (let i in this.voted_status){
        //console.log(this.voted_status[i])
        this.upvotes_without_user[i]=this.contents[i].upvotes;
        this.downvotes_without_user[i]=this.contents[i].downvotes;
        if (this.voted_status[i]==1){
          this.up_buttonColor[i]='green_d3';
          this.upvotes_without_user[i]-=1;
          this.upvote_add[i]=1;
        }
        else if(this.voted_status[i]==-1){
          this.down_buttonColor[i]='green_d3';
          this.upvotes_without_user[i]-=1;
          this.downvote_min[i]=1;
        }
      }
    });

    //this.initial_voted_status();
  }

  /*inital_voted_status(){
    //console.log(this.voted_status)
    for (let i in this.voted_status){
      //console.log(this.voted_status[i])
      if (this.voted_status[i]==1){
        this.up_buttonColor[i]='green_d3';
      }
      else if(this.voted_status[i]==-1){
        this.down_buttonColor[i]='green_d3';
      }
    }
  }*/

  upvoted(i){
    //console.log(i,this.voted_status[i])
    if(this.voted_status[i]==0){
      this.voted_status[i]=1;
      this.upvote_add[i]=1;
      this.up_buttonColor[i]='green_d3';
    }//currently not selected and upvoted
    else if(this.voted_status[i]==1){
      this.voted_status[i]=0;
      this.upvote_add[i]=0;
      this.up_buttonColor[i]='green_l2';
    }//currently upvoted, deselect votes
    else if(this.voted_status[i]==-1){
      this.voted_status[i]=1;
      this.upvote_add[i]=1;
      this.downvote_min[i]=0;
      this.up_buttonColor[i]='green_d3';
      this.down_buttonColor[i]='green_l2'
    }//change from downvote to upvote
  }

  //TO DO: need to update the database
  downvoted(i){
    if(this.voted_status[i]==0){
      this.voted_status[i]=-1;
      this.downvote_min[i]=1;
      this.down_buttonColor[i]='green_d3';
    }//currently not selected and downvoted
    else if(this.voted_status[i]==1){
      this.voted_status[i]=-1;
      this.downvote_min[i]=1;
      this.upvote_add[i]=0;
      this.down_buttonColor[i]='green_d3';
      this.up_buttonColor[i]='green_l2';
    }//change from upvoted to downvoted
    else if(this.voted_status[i]==-1){
      this.voted_status[i]=0;
      this.downvote_min[i]=0;
      this.down_buttonColor[i]='green_l2';
    }//deselct downvotes
  }

  displayQuestion(i){
      this.navCtrl.push(DisplayQuestionPage,{
        data:this.contents[i]
      });
  }
  askQuestion(){
      this.navCtrl.push(AskQuestionPage);
  }


}
