// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as auth0 from 'auth0-js';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  // @TODO: Update AUTH_CONFIG and remove .example extension in src/app/auth/auth0-variables.ts.example
  auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: 'token',
    redirectUri: environment.auth.redirect,
    audience: environment.auth.audience,
    scope: environment.auth.scope
  });
  userProfile: BehaviorSubject<any>=new BehaviorSubject(undefined);
  userId: BehaviorSubject<any>=new BehaviorSubject(undefined);
  accessToken: string;

  constructor(private router: Router) {
    // If token not expired, renew token and fetch profile
    // If token is expired, log out to clear any data
    if (this.isLoggedIn) {
      this.getAccessToken();
    } else {
      this.logout();
    }
  }

  login() {
    // Auth0 authorize request
    this.auth0.authorize();
  }

  handleLoginCallback() {
    // --Begin URL decoding failsafe to fix bug introduced by Angular v5.2.8
    // https://github.com/angular/angular/pull/22687
    const _url = this.router.url;
    if (_url.indexOf('#') > -1 && _url.indexOf('%3D') > -1) {
      window.location.hash = decodeURIComponent(_url).split('#')[1];
    }
    // --End failsafe overzealous URL encoding bugfix
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
      
    });
  }

  getAccessToken() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(err);
      }
    });
  }

  getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
     this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      }
    });
  }

  private _setSession(authResult, profile) {
    const expTime = authResult.expiresIn * 1000 + Date.now();
    // Save authentication data and update login status subject
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    this.accessToken = authResult.accessToken;
    this.userProfile.next(profile);
    this.userId.next(profile.sub.substring(6));
  }

  logout() {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('expires_at');
    this.userProfile.next(undefined);
    this.userId.next(undefined);
    this.accessToken = undefined;
  }

  get isLoggedIn(): boolean {
    // Check if current date is greater than expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

}