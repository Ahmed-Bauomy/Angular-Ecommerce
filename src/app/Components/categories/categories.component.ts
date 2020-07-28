import { Router } from '@angular/router';
import { CategoryService } from './../../Services/category.service';
import { Component, OnInit } from '@angular/core';
import { ICategory } from './../../ViewModels/Interfaces/icategory';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
   Categories: ICategory[];
   CategoryId: number;
  constructor(private _categoryService: CategoryService,private _router:Router) { }

  ngOnInit(): void {
  this._categoryService.getAllCategories().subscribe(
    (data)=>{
      this.Categories=data;
    },
    (err)=>{
      console.log(err);
     /*this._router.navigate(["/Error"]);*/
    }
  );
  }

}
