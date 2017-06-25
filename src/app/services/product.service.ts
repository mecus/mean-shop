import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { iProduct } from "../models/product.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ProductService {
  public products;
  resourceUrl = "http://localhost:3000/api/v1/products";


  constructor( private _http:Http) { }

  // createProduct(product){
  //   return this._af.list('/products')
  //     .push(product).then((res)=>{console.log(res)}).catch(error=>console.log(error));
  // }
  // getProducts(){
  //   let dbRef = firebase.database().ref('/products');
  //     return dbRef.once('value').then((snapshot)=>{
  //       this.products = snapshot.val();
  //     }).catch((err)=>{
  //       console.log(err);
  //     });
  // }

  getProducts(){
    this._http.get(this.resourceUrl).map((res)=>{
      console.log(res);
    })
  }
}
