import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { API } from '../API';
import { StorageProvider } from '../../providers/storage/storage';
import { UserLoginPage } from '../../pages/user-login/user-login';

import 'rxjs/add/operator/map';

/*
  Generated class for the StackMockProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let headers=new Headers();
let options = new RequestOptions({ headers: headers });
headers.append('Access-Control-Allow-Origin','*');
@Injectable()
export class StackMockProvider {
  public contents: any;
  constructor(public http: Http, public storage: StorageProvider) {
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
    let post_content=String("{\"content\":"+JSON.stringify(body)+"}");
    console.log(post_content)
    //this.http.post(API.VM+API.postAnswer,post_content,{headers:headers}).subscribe(data=>{
    return this.http.post(API.VM+API.getVotedStatus,post_content);
  }

  public updateVotedStatus(postID,postType,userID,votedStatus){
    //postID: qid or aid
    //postType: 0 for Q, 1 for A
    //votedStatus -1 for downvote, 1 for upvote, 0 for neutral
    let token=this.storage.getToken()
    console.log(API.VM+API.updateVotedStatus+postID+'/'+postType+'/'+votedStatus)
    return this.http.get(API.VM+API.updateVotedStatus+postID+'/'+postType+'/'+userID+'/'+votedStatus+'/'+token).subscribe(data=>{
    console.log(data)
  });

  }

  public checkFollowers(userID,page,showDetail){
    return this.http.get(API.VM+API.checkFollowers+'/'+userID+'/'+page+'/'+showDetail);
  }

  public checkFollowings(userID,page,showDetail){
    return this.http.get(API.VM+API.checkFollowings+'/'+userID+'/'+page+'/'+showDetail);
  }

  public getFollowingStatus(userID,targetLists){
    let body={
      userID:userID,
      target:targetLists
    }
    let post_content=String("{\"content\":"+JSON.stringify(body)+"}")
    console.log(post_content)
    return this.http.post(API.VM+API.getFollowingStatus,post_content);
  }

  public getUserStatus(userID,showActivities){
    return this.http.get(API.VM+API.getUserStatus+userID+'/'+showActivities);
  }

  public getActivities(userID,postType,actionType,page){
    return this.http.get(API.VM+API.getActivities+userID+'/'+postType+'/'+actionType+'/'+page);
  }

  public updateUserInfo(userName){
    let body={
      userID:this.storage.getUserID(),
      userName:userName,
      token:this.storage.getToken()
    }
    console.log(JSON.stringify(body))
    return this.http.post(API.VM+API.updateUserInfo,JSON.stringify(body));
  }

  public updateFollowers(userID,targetID,followingType){
    let body={
      userID:this.storage.getUserID(),
      targetID:targetID,
      type:followingType,
      token:this.storage.getToken()
    }
    console.log("updateFollowers",body)
    return this.http.post(API.VM+API.updateFollowers,JSON.stringify(body));
  }

  public getqID(aID){
    return this.http.get(API.VM+API.getqID+aID);
  }

  public getFollowingAcitivites(userID,page){
    return this.http.get(API.VM+API.getFollowingAcitivites+userID+'/'+page);
  }

  public deleteQuestionAnswer(postID,type){
    let token=this.storage.getToken();
    let userID=this.storage.getUserID();
    return this.http.get(API.VM+API.deleteQuestionAnswer+postID+'/'+type+'/'+userID+'/'+token);
  }

  public signUp(email,password,userName){
    let body={
      email:email,
      password:password,
      userName:userName
    }
    return this.http.post(API.VM+API.signUp,JSON.stringify(body));
  }

  public login(email,password){
    let body={
      email:email,
      password:password
    }
    return this.http.post(API.VM+API.login,JSON.stringify(body));

  }
  public forgetPassword(email,password){
    let body={
      email:email,
      password:password
    }
    return this.http.post(API.VM+API.forgetPassword,JSON.stringify(body));

  }

  public logout(userID, token){
    let body={
      userID:userID,
      token:token
    }
    console.log("log out",body);
    return this.http.post(API.VM+API.logout,JSON.stringify(body));
  }

  public postAnswer(body,parentID){
    let my_answer={
      userID:this.storage.getUserID(),
      body: body,
      parentID:parentID,
      token:this.storage.getToken()
    };
    //post to url
    let post_content=String("{\"content\":"+JSON.stringify(my_answer)+"}")
    return this.http.post(API.VM+API.postAnswer,post_content)
  }

  public postQuestion(title,body,tags,posted_time){
    let my_question={
      userID:this.storage.getUserID(),
      title:title,
      body:body,
      tags:tags,
      posted_time:posted_time,
      token:this.storage.getToken()
    };
    //post to url
    let post_content=String("{\"content\":"+JSON.stringify(my_question)+"}")
    console.log(post_content)
    return this.http.post(API.VM+API.postQuestion,post_content);
  }

  public search(query){
    let body={
      query:query
    }
    console.log(JSON.stringify(body))
    return this.http.post(API.VM+API.search,JSON.stringify(body));
  }

  public isLogged(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        let isLogged=this.storage.getKey('isLogged');
        resolve(isLogged);
        //reject("false");
      },1000);
    });
  }
}
