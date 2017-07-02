import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';


import { HomeComponent } from '../container/home/home.component';
import * as products from '../container/products/index';
import * as tax from "../admin/taxanomy/index";
import { NewProductComponent } from "../admin/new-product/new-product.component";


const root:Route = {
  path: '',
    redirectTo: '/home', pathMatch: 'full'
}
const routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products/?', component: products.ProductComponent },

  { path: 'products/new', component: NewProductComponent }
 
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class MainRouterModule { }