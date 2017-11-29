import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TenPostsPage } from './ten-posts';

@NgModule({
  declarations: [
    TenPostsPage,
  ],
  imports: [
    IonicPageModule.forChild(TenPostsPage),
  ],
})
export class TenPostsPageModule {}
