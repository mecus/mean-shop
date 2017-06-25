import { Component, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
// import * as firebase from 'firebase';

import { TaxanomyService } from '../../services/taxanomy.service';
import { iProduct } from "../../models/product.model";


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent {


}