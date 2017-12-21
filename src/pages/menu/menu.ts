import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { DishdetailPage } from '../dishdetail/dishdetail';

import { DishProvider } from '../../providers/dish/dish';
import { FavouriteProvider } from '../../providers/favourite/favourite';

import { Dish } from '../../shared/dish.model';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  dishes: Dish[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private dishProvider: DishProvider,
              private favouriteProvider: FavouriteProvider,
              @Inject('BaseURL') private baseUrl,
            private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ionViewWillEnter() {
    this.dishProvider.getDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
    });
  }

  dishDetail(dish: Dish) {
    this.navCtrl.push(DishdetailPage, {
      dish: dish
    });
  }

  addToFavs(dish: Dish) {
    this.favouriteProvider.add(dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + dish.id + ' added as favourite successfully',
      position: 'middle',
      duration: 3000
    }).present();    
  }

}
