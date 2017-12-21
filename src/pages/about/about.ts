import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Leader } from '../../shared/leader.model';

import { LeaderProvider } from '../../providers/leader/leader';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  leaders: Leader[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private leaderProvider: LeaderProvider,
              @Inject('BaseURL') private baseUrl) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  ionViewWillEnter() {
    this.leaderProvider.getLeaderShips().subscribe((data: Leader[]) => {
      this.leaders = data;
    });
  }

}
