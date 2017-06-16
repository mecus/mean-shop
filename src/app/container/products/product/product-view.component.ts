import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { iProduct } from '../../../models/product.model';
import { ProductService } from "../../../services/product.service";
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-product',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  
})
export class ProductViewComponent implements OnInit {
    selectedProduct;
    description:boolean = true;
    review:boolean;
    constructor(private _router:Router,
    private route:ActivatedRoute, private productService:ProductService,
    private location:Location, private cartService:CartService
  ) { 
    
  }
  addToCart(){
      // this.cartService.createCart(this.payLoad());
      // this.store.dispatch({type: cart.ADD, payload: this.payLoad() })
 
   }
   private payLoad() {
      return {
        name: this.selectedProduct.name,
        id: this.selectedProduct.id,
        price: this.selectedProduct.price,
        imageUrl: this.selectedProduct.imageUrl,
        qty: 1
      }
   }
   back(){
     this.location.back();
   }
   showDescription(){
    this.description = true;
    this.review = false;
   }
   showReview(){
    this.review = true;
    this.description = false;
   }
  ngOnInit() {
    // this.route.params.forEach((param)=>{
    //     this.productService.getProducts().subscribe((products)=>{
    //        this.selectedProduct = products.find(product=> product.id == param.id)

    //     })
    // })
    
  }

}