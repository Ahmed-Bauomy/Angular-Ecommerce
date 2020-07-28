import { Router } from '@angular/router';
import { ProductService } from './../../Services/product.service';
import { IProduct } from './../../ViewModels/Interfaces/iproduct';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnChanges {
   products: IProduct[];
   Loading:boolean;
   @Input() catId: number;
   filteredProducts: IProduct[];
  constructor(private _productService: ProductService,private _router:Router) {

   }

  ngOnInit(): void {
     this.Loading=false;
  }
  ngOnChanges(): void{
 
      this.Loading=true;
      this._productService.getAllProducts().subscribe(
      (data)=>{
        console.log(this.catId);
        this.Loading=false;
        this.products=data;
        console.log(this.products);
        this.filteredProducts=this.products.filter(p=>p.Category.Id==this.catId);
        //console.log(this.filteredProducts[0].categoryId);
      },
      (err)=>{
       this.Loading=false;
      this._router.navigate(["/Error"]);
      }
    );
  }
  AddToCart(product: IProduct): void{
    this._productService.AddProductToCart(product);
  }
  getFilteredProducts(): IProduct[]{
   return this.filteredProducts;
  }
}
