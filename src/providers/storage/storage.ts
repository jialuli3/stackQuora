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

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }

  getQuestion(qid){
    return this.storage.get(qid).then(result=>{
      console.log(result);
      return result;
    })
  }
  setQuestion(qid,content){
    console.log(qid,content)
    this.storage.set(qid,content);
  }
}
