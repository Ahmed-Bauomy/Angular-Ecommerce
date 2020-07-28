import { ProductService } from './../../Services/product.service';
import { IProduct } from './../../ViewModels/Interfaces/iproduct';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
   id:number;
   product:IProduct;
   Loading:boolean;
  constructor(private _activatedRout:ActivatedRoute,private _productService:ProductService) { 
  this.Loading=false;
  }

  ngOnInit(): void {
    this.Loading=true;
    this.id=this._activatedRout.snapshot.params["id"];
    this._productService.getProductById(this.id).subscribe(
      (data)=>{
        this.Loading=false;
        this.product=data;
      },
      (err)=>{
        this.Loading=false;
       console.log(err);
      }
    )
  }
  
}
