import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController, AlertController } from 'ionic-angular';

import { Dish } from '../../shared/dish.model';

import { FavouriteProvider } from '../../providers/favourite/favourite';

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {
  favourites: Dish[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private favouriteProvider: FavouriteProvider,
              @Inject('BaseURL') private baseUrl,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritesPage');
  }

  ionViewWillEnter() {
    this.favouriteProvider.getFavorites().subscribe(dishes => this.favourites = dishes);
  }

  deleteFavourite(item: ItemSliding, id: number) {
    let loading = this.loadingCtrl.create({
      content: 'Deleting . . .'
    });

    let toast = this.toastCtrl.create({
      message: 'Dish ' + id + ' deleted successfully!',
      duration: 3000
    });

    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete Dish '+ id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // DO nothing
          }
        },
        {
          text: 'Delete',
          handler: () => {
            loading.present();
            this.favouriteProvider.deleteFavorite(id).subscribe(dishes => {
              loading.dismiss();
              toast.present();
              this.favourites = dishes
            });
          }
        }
      ]
    });
    alert.present();
    item.close();
  }

}
