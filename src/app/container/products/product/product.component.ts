import { Component, OnInit } from '@angular/core';
import { iProduct } from "../../../models/product.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
// import { TaxanomyService } from '../../../services/taxanomy.service';
import { CartService } from '../../../services/cart.service';


// import * as cart from '../../../actions/cart.action';

@Component({
  selector: 'shop-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
 
})
export class ProductComponent implements OnInit {
  products;
  category;
  subCategory;
  department;

  carts;
  inCart:boolean = false;
  

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
   showSubCat(cat){
     this._router.navigate(["/products/?", {dept_id:cat.department_id, cat_id: cat._id, selected: true, code_number: "17889789"}]);
   }
   displayProduct(subcat){
     this._router.navigate(["/products/?", {dept_id:subcat.department_id, cat_id: subcat.category_id, subCat_id: subcat._id, selected: true, code_number: "17889789"}]);
     console.log(subcat);
   }
   

  ngOnInit() {
   
    //Retrieving Products from the database
      this.route.params.forEach((param)=>{
        this.productService.getProducts().subscribe((data)=>{
          this.products = data.products.filter((product)=> product.department_id === param['dept_id']);
          this.category  = data.category.filter((cat)=>cat.department_id == param['dept_id']);
          this.subCategory = data.subcategory.filter((subcat)=> subcat.category_id == param['cat_id']);
        
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
        this.showAdvert(category = param['name'])
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