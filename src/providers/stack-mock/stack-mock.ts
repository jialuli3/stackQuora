import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the StackMockProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StackMockProvider {
  public contents: any;
  constructor(public http: Http) {
    //console.log('Hello StackMockProvider Provider');
  }
  public load(){
  this.http.get('assets/mockData/mockData.json').map(res => res.json()).subscribe(data => {
          //this.contents = data.contents;
          console.log(data.contents);
          return data.contents;
        });

   }
}
