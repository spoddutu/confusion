import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Dish } from '../../shared/dish.model';

import { baseURL } from '../../shared/baseUrl';

/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DishProvider Provider');
  }

  getDishes() {
  	return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: number) {
  	return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  getFeaturedDish() {
    let params = new HttpParams();
    params.set('featured', "true");
  	return this.http.get<Dish[]>(baseURL + 'dishes', {params: params});
  }
  
}
