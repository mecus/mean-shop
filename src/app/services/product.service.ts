import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { iProduct } from "../models/product.model";


@Injectable()
export class ProductService {
  public products;


  constructor( private _http:Http) { }

  // createProduct(product){
  //   return this._af.list('/products')
  //     .push(product).then((res)=>{console.log(res)}).catch(error=>console.log(error));
  // }
  getProducts(){
    let dbRef = firebase.database().ref('/products');
      return dbRef.once('value').then((snapshot)=>{
        this.products = snapshot.val();
      }).catch((err)=>{
        console.log(err);
      });
  }
}
