import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { Dish } from '../../shared/dish.model';

import { DishProvider } from '../dish/dish';

/*
  Generated class for the FavouriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavouriteProvider {

  favourites: Array<any>;

  constructor(public http: HttpClient, private dishProvider: DishProvider,
    private storage: Storage, private localNotifications: LocalNotifications) {
    this.storage.get('favs').then(favs => {
      if(favs) {
        this.favourites = favs;
      }
      else {
        this.favourites = [];
      }
    });  
  }

  add(id: number): boolean {
    if(!this.exists(id)) {
      this.favourites.push(id);
      this.storage.set('favs', this.favourites);
      this.localNotifications.schedule({
        id: id,
        text: 'Dish ' + id + ' added as a favourite successfully'
      });
    }
    return true;
  }

  exists(id: number): boolean {
    return this.favourites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishProvider.getDishes()
      .map(dishes => dishes.filter(dish => this.favourites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favourites.indexOf(id);
    if (index >= 0) {
      this.favourites.splice(index,1);
      this.storage.set('favs', this.favourites);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }
}
