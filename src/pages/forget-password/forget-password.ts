import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
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
  alert:any;
  email:any;
  password:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mockData: StackMockProvider,
    public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  Submit(){
    this.mockData.forgetPassword(this.email,this.password).subscribe(data=>{
      console.log(data)
      this.showAlert("Check your email and confirm the change of password.");
      this.navCtrl.pop();
    },error=>{
      this.showAlert(error);
    });
  }
  Cancel(){
    this.navCtrl.pop();
  }
  showAlert(alertTitle) {
   this.alert = this.alertCtrl.create({
     title:'',
     subTitle: alertTitle,
     buttons: ['OK']
   });
   this.alert.present();
 }
}
