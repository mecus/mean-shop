import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title:string = "Home component works for tsc";
  products ;

  constructor() {
    let dbRef = firebase.database().ref('/products');
      dbRef.once('value').then((snapshot)=>{
        this.products = snapshot.val();
        console.log(this.products);
      })
   }
  
  ngOnInit() {
    // console.log(this.products);
  }

}