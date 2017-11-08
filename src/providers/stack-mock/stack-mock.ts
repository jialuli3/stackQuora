import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the StackMockProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const vm="https://fa17-cs411-44.cs.illinois.edu";
let headers=new Headers();
headers.append('Access-Control-Allow-Origin','*');
@Injectable()
export class StackMockProvider {
  public contents: any;
  constructor(public http: Http) {
    //console.log('Hello StackMockProvider Provider');
  }
  public load_contents(){
    return this.http.get('assets/mockData/mockData.json').map(res => res.json());
    //return this.http.get(vm+'/utilities/userUpdateRandom',{headers:headers}).map(res=>res.json());
    //return this.http.get(vm+'/utilities/userUpdateRandom').map(res=>res.json());//the one works
  }
  public load_user_profile(){
    return this.http.get('assets/mockData/user_profile.json').map(res => res.json());

  }
   /*public get_contents(){
     return this.contents;
   }*/
}
