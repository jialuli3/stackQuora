import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { StackMockProvider } from '../../providers/stack-mock/stack-mock';
import { StorageProvider } from '../../providers/storage/storage';
import { ForgetPasswordPage} from '../forget-password/forget-password';


/**
 * Generated class for the UserLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLoginPage {
  username:any;
  password:any;
  email:any;
  alert:any;
  constructor(public navCtrl: NavController, public alertCtrl:AlertController, public navParams: NavParams, public auth: AuthProvider, public storage:StorageProvider,
     public mockData:StackMockProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLoginPage');
  }
  login(){

  }
  signUp(){
    if(this.username && this.password && this.email){
      this.mockData.signUp(this.email,this.password,this.username).map(res=>res.json()).subscribe(data=>{
        console.log(data.status);
      });
    }
    else{
      this.showAlert();
    }
  }
  forgetPassword(){
    this.navCtrl.push(ForgetPasswordPage);
  }

  showAlert() {
   this.alert = this.alertCtrl.create({
     title:'',
     subTitle: 'Missing Username, Email, or Password!',
     buttons: ['OK']
   });
   this.alert.present();
 }
}
