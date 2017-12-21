import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';

import { CommentPage } from '../comment/comment';

import { Dish } from '../../shared/dish.model';

import { FavouriteProvider } from '../../providers/favourite/favourite';

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  avgstars: string;
  numcomments: number;
  favourite: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject('BaseURL') private baseUrl,
    private favouriteProvider: FavouriteProvider, private toastCtrl: ToastController,
    private actionsheetCtrl: ActionSheetController, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  ionViewWillEnter() {
    this.dish = this.navParams.get('dish');
    this.numcomments = this.dish.comments.length;
    this.favourite = this.favouriteProvider.exists(this.dish.id);
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
  }

  addToFavs() {
    this.favourite = this.favouriteProvider.add(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favourite successfully',
      position: 'middle',
      duration: 3000
    }).present();
  }

  showMore() {
    let more = this.actionsheetCtrl.create({
      title: 'More Options...',
      buttons: [
        {
          text: 'Add to Favourites',
          handler: () => {
            this.addToFavs();
          }
        },
        {
          text: 'Add Comment',
          handler: () => {
            let commentModal = this.modalCtrl.create(CommentPage);
            commentModal.onDidDismiss(data => {
              this.dish.comments.push(data);
            });

            commentModal.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    more.present();
  }

}
