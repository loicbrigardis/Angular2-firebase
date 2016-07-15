import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import {Business} from '../business';
import {Category} from '../category';


@Injectable()
export class BusinessService {
  businesses: FirebaseListObservable<Business[]>;
  categories: FirebaseListObservable<Category[]>;
  private databaseBusinesses = this.af.database.list('/businesses');
  
  constructor(
    private af:AngularFire,
    private _http:Http
    ) {}

  getBusinesses(categorie?:string){
    if (categorie !== "all") {
      this.businesses = this.af.database.list('/businesses', {
        query: {
          orderByChild: 'category',
          equalTo: categorie
      }
      }) as FirebaseListObservable<Business[]>;
    } else {
      this.businesses = this.databaseBusinesses as FirebaseListObservable<Business[]>;
    }

    return this.businesses;
 
  }

  getCategories() {
    return this.af.database.list('/categories') as FirebaseListObservable<Category[]>;
  }

  addBusiness (newBusiness): Promise <any> {
    
    return this.databaseBusinesses.push(newBusiness);
  }

  updateBusiness(key, updBusiness):Promise<any>{
    
    return this.databaseBusinesses.update(key, updBusiness);
  }

    // Delete Business
  deleteBusiness(key){
    return this.databaseBusinesses.remove(key);
  }

}

