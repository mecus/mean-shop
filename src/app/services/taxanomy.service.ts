import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import * as firebase from 'firebase';


@Injectable()

export class TaxanomyService {
    category = [
    {
      "category" : "Dry Food",
      "name" : "Rice"
    },
    {
      "category" : "Dry Food",
      "name" : "Fish"
    },
    {
      "category" : "Dry Food",
      "name" : "Gary"
    },
    {
      "category" : "Frozen Food",
      "name" : "Prowns"
    },
    {
      "category" : "Frozen Food",
      "name" : "Peas"
    },
    {
      "category" : "Frozen Food",
      "name" : "Crunchy"
    }
        ];
    department = [
    {"code" : "5069874", "name" : "Frozen Food"},
    {"code" : "5069874", "name" : "Baverages"},
    {"code" : "5069874", "name" : "Drinks"},
    {"code" : "5069874", "name" : "Ingredients"},
    {
      "code" : "7890576",
      "name" : "Health and Beauty"
    },
    {
      "code" : "5069874",
      "name" : "Dry Food"
    },
    {
      "code" : "9086475",
      "name" : "Bakery"
    }
    ]
    

    constructor(){}

    createCategory(cat){
        return

    }
    getCategory(){
        return this.category
    }
    removeCategory($key){
        console.log($key)
        return this.category
    }

    createDepartment(dept){
        console.log(dept)
    }
    getDepartment(){
       return this.department;
    }
    removeDepartment($key){
        return this.department;
    }

}