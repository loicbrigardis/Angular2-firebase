import { Component, OnInit } from '@angular/core';
import { BusinessService } from './services/business.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import 'rxjs/add/operator/do';
import {Business} from './business';
import {Category} from './category';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [BusinessService]
})
export class AppComponent implements OnInit {
  appState:string;
  activeKey:string;
  businessKey:number;
  businesses: Business[];
  categories: Category[];

  activeCompany:string;
  activeCategory:string;
  activeYearsInBusiness:string;
  activeDescription:string;
  activePhone:string;
  activeEmail:string;
  activeStreetAddress:string;
  activeCity:string;
  activeState:string;
  activeZipcode:string;

  constructor(private _businessService: BusinessService) {

  }

  ngOnInit() {
    this.appState = 'default';

    this._businessService.getBusinesses()
      .subscribe(businesses => this.businesses = businesses);

    this._businessService.getCategories()
      .subscribe(categories => this.categories = categories);

  }

  changeState(state, key?) {
    if (key) {
      this.activeKey = key
    }
    this.appState = state;
  }

  filterCategory(category) {
    this._businessService.getBusinesses(category)
      .subscribe(businesses => this.businesses = businesses);

  }

  addBusiness(
    company:string,
    category:string, 
    years_in_business:number,
    description:string,
    phone:string,
    email:string,
    street_address:string,
    city:string,
    state:string,
    zipcode:string
  ){
    var created_at = new Date().toString();
    var newBusiness = {
      company:company,
      category:category,
      years_in_business:years_in_business,
      description:description,
      phone:phone,
      email:email,
      street_address: street_address,
      city: city,
      state: state,
      zipcode: zipcode,
      created_at:created_at
    }
    //console.log(newBusiness);
    this._businessService.addBusiness(newBusiness);
    
    this.changeState('default');
  }

  showEdit(business){
    this.changeState('edit', business.$key);
    this.activeCompany =          business.company;
    this.activeCategory =         business.category;
    this.activeYearsInBusiness =  business.years_in_business;
    this.activeDescription =      business.description;
    this.activePhone =            business.phone;
    this.activeEmail =            business.email;
    this.activeStreetAddress =    business.street_address;
    this.activeCity =             business.city;
    this.activeState =            business.state;
    this.activeZipcode =          business.zipcode;
  }

  updateBusiness(){
    var updBusiness = {
      company:this.activeCompany,
      category:this.activeCategory,
      years_in_business:this.activeYearsInBusiness,
      description:this.activeDescription,
      phone:this.activePhone,
      email:this.activeEmail,
      street_address: this.activeStreetAddress,
      city: this.activeCity,
      state: this.activeState,
      zipcode: this.activeZipcode
    }
    
    this._businessService.updateBusiness(this.activeKey, updBusiness);
    this.changeState('default');
  }

    deleteBusiness(key){
    this._businessService.deleteBusiness(key);
    this.changeState('default');
  }

}

