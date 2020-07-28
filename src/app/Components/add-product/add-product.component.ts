import { Router } from '@angular/router';
import { ProductService } from './../../Services/product.service';
import { ICategory } from './../../ViewModels/Interfaces/icategory';
import { CategoryService } from './../../Services/category.service';
import { IProduct } from './../../ViewModels/Interfaces/iproduct';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  Loading:boolean;
  Product:IProduct;
  CategoryList:ICategory[];
  ModelState:string[];
  constructor(private _catService:CategoryService,private _productService:ProductService,private _router:Router) {
    this.Product={
      Name:'',
      Details:'',
      Image:'',
      OriginalQuantity:null,
      Quantity:null,
      Price:null,
      CategoryId:null,  
      Category:null,
      Id:null
    }
   }

  ngOnInit(): void {
    this.Loading=true;
    this._catService.getAllCategories().subscribe(
      (data)=>{
        this.Loading=false;
        this.CategoryList=data;
      },
      (err)=>{
        this.Loading=false;
        console.log(err);
        this.ModelState=err.error.ModelState[""];
      }
    )
  }
  CreateNewProduct(){
    this.Loading=true;
    this.Product.Quantity=this.Product.OriginalQuantity;
    console.log(this.Product);
     this._productService.AddProduct(this.Product).subscribe(
       (data)=>{
         this.Loading=false;
         console.log(data);
          this._router.navigate(['/Home']);
       },
       (err)=>{
         this.Loading=false;
        if(err.error.ModelState!=null){
          this.ModelState=err.error.ModelState[""];
        }else{
          this.ModelState=["Unkown error" , "Try again later"];
        }
       }
     )
  }
}
