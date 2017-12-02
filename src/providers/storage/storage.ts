import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {
  token:any;
  userID:any;
  constructor(public http: Http, public storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }

  getKey(key){
    return this.storage.get(key);
  }
  setKey(key,content){
    this.storage.set(key,content);
    if(key=="userInfo"){
      this.token=content[1];
      this.userID=content[0];
    }
  }
  getToken(){
    return this.token;
  }

  getUserID(){
    return this.userID;
  }
  getQuestion(qid){
    return this.storage.get(qid).then(result=>{
      console.log(result);
      return result;
    });
}
}
