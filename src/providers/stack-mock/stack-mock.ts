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
   /*public get_contents(){
     return this.contents;
   }*/
}
