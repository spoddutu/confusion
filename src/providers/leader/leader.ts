import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Leader } from '../../shared/leader.model';

import { baseURL } from '../../shared/baseUrl';

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LeaderProvider Provider');
  }

  getLeaderShips(){
  	return this.http.get<Leader[]>(baseURL + 'leaders');
  }

  getLeaderShip(id: number){
  	return this.http.get<Leader>(baseURL + 'leaders/' + id);
  }

  getFeaturedLeader(){
    let params = new HttpParams();
    params.set('featured', "true");
    return this.http.get<Leader[]>(baseURL + 'leaders', {params: params});
  }}
