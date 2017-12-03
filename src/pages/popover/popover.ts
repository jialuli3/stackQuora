import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { EditProfilePage} from '../edit-profile/edit-profile';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  template:`
    <ion-list no-lines>
      <button ion-item (click)="edit()">Edit Profile</button>
    </ion-list>
    `
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
  }


  edit(){
    this.navCtrl.push(EditProfilePage)
    this.viewCtrl.dismiss();
  }
}
