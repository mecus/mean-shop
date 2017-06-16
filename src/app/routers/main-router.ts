import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';


import { HomeComponent } from '../container/home/home.component';
import * as products from '../container/products/index';
 

const root:Route = {
  path: '',
    redirectTo: '/home', pathMatch: 'full'
}
const routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: products.ProductComponent },
  { path: 'products/?', component: products.CategoryDisplayComponent }
 
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash:true})
  ],
  exports: [RouterModule],
  declarations: []
})
export class MainRouterModule { }