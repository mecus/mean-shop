import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './utility/material-design.module';
import { ProductModule } from "./container/products/product.module";

import { MainRouterModule } from './routers/main-router';
import { AdminModule } from './admin/admin.module';


import { AppComponent }  from './app.component';
import { HomeComponent } from './container/home/home.component';
import { TopMenuComponent } from './container/menu/top-menu/top-menu.component';
import { SubMenuComponent } from './container/menu/top-menu/sub-menu';

import { ProductService } from './services/product.service';


@NgModule({
  imports: [ 
    BrowserModule, FormsModule, ReactiveFormsModule,
    HttpModule, MainRouterModule, MaterialModule, ProductModule,
    AdminModule

  ],
  declarations: [ AppComponent, HomeComponent, TopMenuComponent, SubMenuComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ProductService]
})
export class AppModule { }
