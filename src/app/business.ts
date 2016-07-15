export interface Business {
  $key?: string;
  company?: string;
  description?:string;
  category:string;
  years_in_business?:number;
  street_adress?:string;
  city:string;
  state?:string;
  zipcode?:string;
  phone?:string;
  email?:string;
  created_at:string;
}