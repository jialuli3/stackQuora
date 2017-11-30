import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StackMockProvider } from '../../providers/stack-mock/stack-mock';
import { API } from '../../providers/API';


/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  my_name:string="My Name";
  updated_name:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mockData:StackMockProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  Submit(){
    this.mockData.updateUserInfo(API.userID,this.updated_name).subscribe(data=>{
      console.log(data);
    })
    this.navCtrl.pop();
  }
  Cancel(){
    this.navCtrl.pop();
  }
}
