import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../utility/material-design.module';
import { CartService } from '../../services/cart.service';

import * as products from './index';




@NgModule({
    declarations: [ 
        products.ProductViewComponent, 
        products.ProductComponent
    ],
    imports: [
        MaterialModule, BrowserModule
        
    ],
    providers: [CartService],
    exports: []
})

export class ProductModule {}