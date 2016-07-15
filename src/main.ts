import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';


if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  HTTP_PROVIDERS,
  // Initialize Firebase app  
  defaultFirebase({
    apiKey: "AIzaSyB_8T55Bj61b0SNXfGl6xFm76nuaqvbLyI",
    authDomain: "businessapp-35641.firebaseapp.com",
    databaseURL: "https://businessapp-35641.firebaseio.com",
    storageBucket: "businessapp-35641.appspot.com",
  })
]);

