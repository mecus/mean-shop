import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TaxanomyService } from '../../services/taxanomy.service';

@Component({
  selector: 'new-category',
  template: `
    <h1>Product Category</h1>
    <form>
      <div class="form-input">
        <input class="form-control" #cat type="text" required placeholder="Category">
        <select class="form-control" #deptIn placeholder="Select Dept">
          <option *ngFor="let dpt of dept" [value]="dpt.name">
                {{dpt.name}}
            </option>
        </select>
      </div>
      <div class="save-btn">
        <button (click)="save(cat.value, deptIn.value)" color="accent" md-raised-button> Save Category</button>
      </div>
    </form>

    <div>

        <table class="table table-striped">
          <thead class="thead-inverse">
            <tr>
              <th>Category</th>
              <th></th>
              <th>Department</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let cat of category | async">
             
              <td>{{cat.name}}</td>
              <td>Belongs to >></td>
              <td>{{cat.category}}</td>
              
            </tr>
            </tbody>
          </table>
       
    </div>
  `,
  styles: [`
    .form-input{
      margin: 10px;
    }
    .form-input input{
      margin-bottom: 5px;
    }
    .save-btn{
      margin: 0 auto;
      text-align: center;
      padding: 10px;
    }
  `]
})
export class NewCategoryComponent implements OnInit {
  category;
  dept;

  constructor(private _ts:TaxanomyService) { 
    this.category = _ts.getCategory();
    
      this.dept = _ts.getDepartment()

  }

  ngOnInit() {
  }
  save(cat, group){
    let category = {
        name: cat, category: group
    }
    this._ts.createCategory(category);
  }
  delete(key){
    let DA = confirm("Are you sure");
    if(DA == true){
      this._ts.removeCategory(key);
    }
    
  }
}
