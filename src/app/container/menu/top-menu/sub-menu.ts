import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'sub-menu',
  templateUrl: './sub-menu.html',
  styleUrls:['./sub-menu.css']
})
export class SubMenuComponent implements OnInit {
    category;
    departments;
    selected: boolean =false;
    loginWindow:boolean;

  constructor(private router:Router, private productService:ProductService, private _http:Http, private route:ActivatedRoute) {
      
   }

  selectedDept(dept){
    dept.selected = true;
    // console.log(dept.name);
    switch(dept.name){
      case "Frozen Food":{
        this.router.navigate(["/products/?", {dept_id:dept._id, name:dept.name, selected: true, code_number: "17889789"}]);
        break;
      }
      case "Dry Food":{
        this.router.navigate(["/products/?", {dept_id: dept._id, name:dept.name, selected: true, code_number: "209887445"}]);
        break;
      }
      case "Drinks":{
        this.router.navigate(["/products/?", {dept_id: dept._id, name:dept.name, selected: true, code_number: "209887445"}]);
        break;
      }
      case "Ingredients":{
        this.router.navigate(["/products/?", {dept_id: dept._id, name:dept.name, selected: true, code_number: "209887445"}]);
        break;
      }
      case "Baverages":{
        this.router.navigate(["/products/?", {dept_id: dept.id, name:dept.name, selected: true, code_number: "209887445"}]);
        break;
      }

      default: {
        this.router.navigate(["/home"]);
      }
    }

    this.route.params.forEach((param)=>{
      // console.log(param);
    });
    
  }
  
  ngOnInit() {
    this.productService.getProducts().subscribe((data)=>{
      this.departments =data.department;
    });
  }

}