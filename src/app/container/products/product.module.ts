import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../utility/material-design.module';

import * as products from './index';




@NgModule({
    declarations: [ 
        products.CategoryDisplayComponent, products.ProductViewComponent, 
        products.ProductComponent
    ],
    imports: [
        MaterialModule, BrowserModule
        
    ],
    exports: []
})

export class ProductModule {}