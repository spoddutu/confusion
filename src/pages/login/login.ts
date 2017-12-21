import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { User } from '../../shared/user.model';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  user: User = { username: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private storage: Storage, private viewCtrl: ViewController) {
      this.storage.get('user').then(user => {
        if(user) {
          this.user = user;
          this.loginForm.patchValue({
            username: this.user.username,
            password: this.user.password
          });        
        }
      });

      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        remember: true
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.user = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };
    if(this.loginForm.get('remember').value) {
      this.storage.set('user', this.user);
    }
    else {
      this.storage.remove('user');
    }
    this.viewCtrl.dismiss();
  }

}
