import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'sub-menu',
  templateUrl: './sub-menu.html',
  styleUrls:['./sub-menu.scss']
})
export class SubMenuComponent implements OnInit {
    category;
    loginWindow:boolean;

  constructor(private router:Router) {
      
   }
    authenticate(){
    this.loginWindow = true;
   }
   closeWindow(){
     this.loginWindow = false;
   }
   //Routing to Products page
   routing(){
    this.router.navigate(['/products', {products: 'all-category'}]);
    // this.store.dispatch({type:'NAVIGATE', payload: {products: 'all-category'}});
   }
   //Selecting Category
   selectCategory(){
    alert(this +"Selected");
   }

  frozenFood(){
      this.router.navigate(["/products", {category:'Frozen Food', code_number: "17889789"}]);
    }
  dryFood(){
     this.router.navigate(["/products", {category: 'Dry Food', code_number: "209887445"}]);
  }
   beverages(){
     this.router.navigate(["/products", {category: 'Baverages', code_number: "367885423"}]); 
  }
   drinks(){
     this.router.navigate(["/products", {category: 'Drinks', code_number: "4564332459"}]); 
  }
  ingredients(){
     this.router.navigate(["/products", {category: 'Ingredients', code_number: "4564332459"}]);
  }
  bakery(){
    this.router.navigate(["/products", {category: 'Bakery', code_number: "4564332459"}]);  
  }
  
  ngOnInit() {
  }

}