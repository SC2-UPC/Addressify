import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';


import { Api } from '../api/api';
import {HttpHeaders} from "@angular/common/http";

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;



  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('users/login', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('users/register', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.code == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  update(accountInfo:any, user:any){
    let userId=user._id;
    let token = user.token;
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", token);
    let seq = this.api.post(`users/`+userId, accountInfo, {headers:headers}).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.code == 'success') {
        console.log("ok");
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  contact(body:any){
    let seq = this.api.post(`users/contact`, body).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.code == 'success') {
        console.log("ok");
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  deleteuser(user:any){
    let userId=user._id;
    let token = user.token;
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", token);
    let seq = this.api.delete(`users/`+userId, {headers:headers}).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.code == 'success') {
        console.log("ok");
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  loginFB(user:any){
    let token = user.token;
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", token);
    let seq = this.api.post(`users/loginFB`,user, {headers:headers}).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.code == 'success') {
        console.log("ok");
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  password(email:any){
    let seq = this.api.post(`users/auth/forgotPassword`, email).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.code == 'success') {
        console.log("ok");
      }
    }, err => {
      console.error('ERROR', err);
    });

   return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
