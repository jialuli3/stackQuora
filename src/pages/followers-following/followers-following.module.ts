import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowersFollowingPage } from './followers-following';

@NgModule({
  declarations: [
    FollowersFollowingPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowersFollowingPage),
  ],
})
export class FollowersFollowingPageModule {}
