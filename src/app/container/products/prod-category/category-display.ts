import { Component, OnInit } from '@angular/core';
import { iProduct } from "../../../models/product.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
// import { TaxanomyService } from '../../../services/taxanomy.service';
import { CartService } from '../../../services/cart.service';


// import * as cart from '../../../actions/cart.action';

@Component({
  selector: 'cat-display',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
 
})
export class CategoryDisplayComponent implements OnInit {
  products;
  carts;
  inCart:boolean = false;
  category;

  frozen:boolean;
  drink:boolean;
  dry:boolean;
  baverages:boolean;
  ingredients:boolean;
  bakery:boolean;
  

  constructor(private route:ActivatedRoute,
  private _router:Router, private productService:ProductService, private cartService:CartService) {
    // this.carts = cartService.getCart(); //cart pulled out from the database to indicate selection
    // this.carts = this.store.select('cartReducer') //Retrieving cart from the store
   }


   //creating a cart payload to be sent to the database
   private payLoad(product) {
      return {
        name: product.name,
         id: product.id,
         price: product.price,
         imageUrl: product.imageUrl,
         qty: 1
      }
   }

   //Adding Item to the cart
   addToCart(product){
    //  this.cartService.createCart(this.payLoad(product));
    //  this.store.dispatch({type: cart.ADD, payload: this.payLoad(product) });
     
   }

   //Displaying a single product
   viewProduct(product){
     this._router.navigate(["/product", {id:product.id, product: product.name}]);
   }
   

  ngOnInit() {
   
    //Retrieving Products from the database
      this.route.params.forEach((param)=>{
        this.productService.getProducts().subscribe((data)=>{
          this.products = data.products;
          this.category  = data.department;
        
        })

        // let dbRef = firebase.database().ref('/products');
        //   dbRef.once('value').then((snapshot)=>{
        //     this.products = snapshot.val().filter((product)=> product.category == param['category'] )
        //     console.log(this.products);
        //   });
        // Displaying Category list
        // this.productService.subscribe((group)=>{
        //   this.category = group.filter((cat)=> cat.category == param['category'])
        // })
        let category
        this.showAdvert(category = param['category'])
    })

  }//ngOnInit end here

  showAdvert(category){
    switch(category){
      case "Frozen Food": {
        this.frozen = true
        this.drink = false
        this.dry = false
        this.baverages = false
        this.ingredients = false
        this.bakery = false;
        break
      }
      case "Drinks": {
        this.drink = true
        this.dry = false
        this.frozen = false
        this.baverages = false
        this.ingredients = false
        this.bakery = false
        break
      }
      case "Dry Food": {
        this.dry = true
        this.frozen = false
        this.drink = false
        this.baverages = false
        this.ingredients = false
        this.bakery = false
        break
      }
      case "Ingredients": {
        this.ingredients = true
        this.baverages = false
        this.drink = false
        this.dry = false
        this.frozen = false
        this.bakery = false
        break
      }
      case "Baverages": {
        this.baverages = true
        this.drink = false
        this.dry = false
        this.frozen = false
        this.ingredients = false
        this.bakery = false
        break
      }
      case "Bakery": {
        this.bakery = true
        this.baverages = false
        this.drink = false
        this.dry = false
        this.frozen = false
        this.ingredients = false
        break
      }
      default:{
        return;
      }
    }
  }//End of Switch case function

}