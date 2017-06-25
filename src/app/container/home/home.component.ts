import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title:string = "Home component works for tsc";
  products ;
  resourceUrl = "http://localhost:3000/api/v1/products";

  constructor(private _http:Http) {
    let dbRef = firebase.database().ref('/products');
      dbRef.once('value').then((snapshot)=>{
        // this.products = snapshot.val();
        // console.log(this.products);
      })
   }
  
  ngOnInit() {
    // console.log(this.products);
    this._http.get("http://localhost:3000/api/v1/products").map((res)=>{
      this.products = res.json();
    }).subscribe();
  }

}