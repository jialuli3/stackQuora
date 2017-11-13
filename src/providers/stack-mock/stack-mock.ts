import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { API } from '../API';
import 'rxjs/add/operator/map';

/*
  Generated class for the StackMockProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let headers=new Headers();
headers.append('Access-Control-Allow-Origin','*');
@Injectable()
export class StackMockProvider {
  public contents: any;
  constructor(public http: Http) {
    //console.log('Hello StackMockProvider Provider');
  }
  public getUserTimeline(){
    //return this.http.get('assets/mockData/mockData.json').map(res => res.json());
    //return this.http.get(vm+'/utilities/userUpdateRandom',{headers:headers}).map(res=>res.json());
    //return this.http.get(vm+'/utilities/userUpdateRandom').map(res=>res.json());//the one works
    return this.http.get(API.VM+API.getUserTimeline).map(res=>res.json());//the one works

  }
  public load_user_profile(){
    return this.http.get('assets/mockData/user_profile.json').map(res => res.json());

  }
  public displayQuestionAnswers(id,type){
    //type 0 for aid, type 1 for qid
    return this.http.get(API.VM+API.displayQuestionAnswers+id+'/'+type).map(res=>res.json());
  }

  public getVotedStatus(userID,qid,aid){
    let body={
      userID:userID,
      qIDs:qid,
      aIDs:aid
    }
    let post_content=String("{\"content\":"+JSON.stringify(body)+"}")
    console.log(post_content)
    //this.http.post(API.VM+API.postAnswer,post_content,{headers:headers}).subscribe(data=>{
    return this.http.post(API.VM+API.getVotedStatus,post_content);
  }

  public updateVotedStatus(postID,postType,userID,votedStatus){
    //postID: qid or aid
    //postType: 0 for Q, 1 for A
    //votedStatus -1 for downvote, 1 for upvote, 0 for neutral
    console.log(API.VM+API.updateVotedStatus+postID+'/'+postType+'/'+votedStatus)
    return this.http.get(API.VM+API.updateVotedStatus+postID+'/'+postType+'/'+userID+'/'+votedStatus).subscribe(data=>{
    console.log(data)
  });

  }

}
