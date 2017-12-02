import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { StackMockProvider } from '../../providers/stack-mock/stack-mock';
import { StorageProvider } from '../../providers/storage/storage';
import { ForgetPasswordPage} from '../forget-password/forget-password';
import { TabsPage } from '../tabs/tabs';


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
  constructor(public navCtrl:NavController, public alertCtrl:AlertController, public navParams: NavParams, public auth: AuthProvider, public storage:StorageProvider,
     public mockData:StackMockProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLoginPage');
    this.checkLogin();
  }

  checkLogin(){
    console.log(this.storage.getKey("account"))
    this.storage.getKey("account").then((value)=>{
      if(value[0]!=null){
      this.email=value[0];
      this.password=value[1];
      this.login();
    }
    });
  }
  login(){
    this.mockData.login(this.email,this.password).map(res=>res.json()).subscribe(data=>{
      console.log(data);
      this.storage.setKey("isLogged",true);
      this.storage.setKey("userInfo",[data.userID,data.token])
      this.storage.setKey("account",[this.email,this.password]);
      //this.storage.setKey("password",this.password);
      this.navCtrl.setRoot(TabsPage,{});
    },error=>{
      console.log(error._body);
      this.storage.setKey("isLogged",false);
      this.storage.setKey("userInfo",["",""])
      this.storage.setKey("account",["",""]);
      this.showAlert(error._body);
    });
  }
  signUp(){
    if(this.username && this.password && this.email){
      this.mockData.signUp(this.email,this.password,this.username).map(res=>res.json()).subscribe(data=>{
        console.log(data);
        this.storage.setKey("isLogged",true);
        this.storage.setKey("userID",data.userID);
        this.storage.setKey("token",data.token);
        this.storage.setKey("account",[this.email,this.password]);
        this.navCtrl.setRoot(TabsPage,{});

      },error=>{
        console.log(error._body);
        this.storage.setKey("isLogged",false);
        this.storage.setKey("userInfo",["",""])
        this.storage.setKey("account",["",""]);
        this.showAlert(error._body);
      });

    }
    else{
      this.showAlert("Missing Username, Email, or Password!");
    }
  }
  forgetPassword(){
    this.navCtrl.push(ForgetPasswordPage);
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
