import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NewProductComponent } from './new-product/new-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import * as tax from './taxanomy/index';

@NgModule({
  imports: [
    BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, HttpModule,
    
  ],
  declarations: [
    NewProductComponent, tax.TaxanomyComponent, tax.NewDeptComponent,
    tax.NewCategoryComponent, DashboardComponent
    ]
})
export class AdminModule {}
