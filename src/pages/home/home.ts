import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Dish } from '../../shared/dish.model';
import { Promotion } from '../../shared/promotion.model';
import { Leader } from '../../shared/leader.model';

import { DishProvider } from '../../providers/dish/dish';
import { LeaderProvider } from '../../providers/leader/leader';
import { PromotionProvider } from '../../providers/promotion/promotion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
 
  dish: Dish;
  leader: Leader;
  promotion: Promotion;

  constructor(public navCtrl: NavController,
              private dishProvider: DishProvider,
              private leaderProvider: LeaderProvider,
              private promotionProvider: PromotionProvider,
              @Inject('BaseURL') private baseUrl) {}

  ngOnInit() {
    console.error("View Created"); 
    this.dishProvider.getFeaturedDish().subscribe((data: Dish[]) => {
      this.dish = data[0];
    });
    this.promotionProvider.getFeaturedPromotion().subscribe((data: Promotion[]) => {
      this.promotion = data[0];
    });
    this.leaderProvider.getFeaturedLeader().subscribe((data: Leader[]) => {
      this.leader = data[0];
    });
  }

}
