import { CategoryService } from './../../Services/category.service';
import { ICategory } from './../../ViewModels/Interfaces/icategory';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { IProduct } from 'src/app/ViewModels/Interfaces/iproduct';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id:number;
  Product:IProduct;
  Loading:boolean;
  CategoryList:ICategory[];
  ModelState:string[];
  UpdateForm:FormGroup;
  constructor(private _activatedRoute:ActivatedRoute,
              private _productService:ProductService,
              private _router:Router,
              private _catService:CategoryService,
              private _FormBuilder:FormBuilder) { 
                this.Product={
                  Name:'',
                  Details:'',
                  Image:'',
                  OriginalQuantity:null,
                  Quantity:null,
                  Price:null,
                  CategoryId:null,  
                  Category:{Id:null ,Name:'',Products:[]},
                  Id:null
                }
                this.CategoryList=[];
              }

  ngOnInit(): void {
    /*validation */
    this.UpdateForm=this._FormBuilder.group({
     PName:['',[Validators.required,Validators.minLength(4),Validators.pattern("[a-zA-Z ._%+-]*")]],
     PDetails:['',[Validators.required]],
     PImage:['',Validators.required],
     PPrice:['',Validators.required],
     PQuantity:['',Validators.required]
    });
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
   this.Loading=true;
    this.id=this._activatedRoute.snapshot.params["id"];
    this._productService.getProductById(this.id).subscribe(
     (data)=>{
      this.Loading=false;
     this.Product=data;
     },
     (err)=>{
       this.Loading=false;
      console.log(err);
     }
    )
  }
  EditProduct(){
    this.Loading=true;
    console.log(this.Product);
    this.Product.Category=this.CategoryList.find(c=>c.Id==this.Product.Category.Id);
    this.Product.CategoryId=this.Product.Category.Id;
    console.log(this.Product);
   this._productService.EditProduct(this.Product).subscribe(
   (data)=>{
    this.Loading=false;
     alert("Edited");
     this._router.navigate(["/Home"]);
   },
   (err)=>{
    this.Loading=false;
    console.log(err);
   }
   );
  }

}
