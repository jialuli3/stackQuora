import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StackMockProvider} from '../../providers/stack-mock/stack-mock';

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  email:any;
  password:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mockData: StackMockProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  Submit(){
    this.mockData.forgetPassword(this.email,this.password).map(res=>res.json()).subscribe(data=>{

    });
  }
  Cancel(){
    this.navCtrl.pop();
  }
}
