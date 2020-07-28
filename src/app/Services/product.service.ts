import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './../ViewModels/Interfaces/iproduct';
import { ICartItem } from './../ViewModels/Interfaces/icart-item';
import { ICart } from './../ViewModels/Interfaces/icart';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: IProduct[];
  Cart: ICart;
  NumberOfProductsInCart: number;
  baseUrl:string;
  constructor(private _http:HttpClient) {
    this.baseUrl="https://localhost:44340";
    if(sessionStorage.getItem("NumberOfProductsInCart")!=null){
      this.NumberOfProductsInCart = Number.parseInt(sessionStorage.getItem("NumberOfProductsInCart"));
    }else{
      this.NumberOfProductsInCart=0;
    }
    if(sessionStorage.getItem("Cart")!=null){
      this.Cart = JSON.parse(sessionStorage.getItem("Cart"));
    }else{
      this.Cart = {
        Items: [],
        TotalPrice: 0
      };
    }
   
   /* this.products = [
      {Id: 1, Name: 'product 1' , Price: 1500, Details: '' , Quantity: 2, OriginalQuantity: 2, categoryId: 1, Image: 'https://via.placeholder.com/150'},
      {Id: 2, Name: 'product 2' , Price: 1500, Details: '' , Quantity: 5, OriginalQuantity: 5, categoryId: 2, Image: 'https://via.placeholder.com/400'},
      {Id: 3, Name: 'product 3' , Price: 1500, Details: '' , Quantity: 4, OriginalQuantity: 4, categoryId: 3, Image: 'https://via.placeholder.com/150'},
      {Id: 4, Name: 'product 4' , Price: 1500, Details: '' , Quantity: 6, OriginalQuantity: 6, categoryId: 1, Image: 'https://via.placeholder.com/150'},
      {Id: 5, Name: 'product 5' , Price: 1500, Details: '' , Quantity: 7, OriginalQuantity: 7, categoryId: 3, Image: 'https://via.placeholder.com/150'},
      {Id: 6, Name: 'product 6' , Price: 1500, Details: '' , Quantity: 2, OriginalQuantity: 7, categoryId: 3, Image: 'https://via.placeholder.com/150'},
    ];*/
  }
  getAllProducts():Observable<IProduct[]>{
    return this._http.get<IProduct[]>(this.baseUrl+"/api/Product");
  }
  AddProduct(product: IProduct):Observable<IProduct>{
   return this._http.post<IProduct>(this.baseUrl+"/api/Product",product);
  }
  EditProduct(product: IProduct){
   return this._http.put(this.baseUrl+`/api/Product/${product.Id}`,product);
  }
  getProductById(id: number):Observable<IProduct>{
  return this._http.get<IProduct>(this.baseUrl+`/api/Product/${id}`);
  }
  RemoveProductById(id: number){
     return this._http.delete(this.baseUrl+`/api/Product/${id}`);
  }
  getProductsByCategoryId(id: number): IProduct[]{
    return this.products.filter(pro=>pro.CategoryId==id);
  }
  AddProductToCart(pro: IProduct): void{

    var isExist = this.Cart.Items.find(i => i.product.Id == pro.Id);
    if ( isExist != null ){
        isExist.Quantity += 1;
        this.Cart.TotalPrice += pro.Price;
    }else{
      var CartItem = {product: pro , Quantity: 1};
      this.Cart.Items.push(CartItem);
      this.Cart.TotalPrice += pro.Price;
    }
    sessionStorage.setItem("Cart",JSON.stringify(this.Cart));
    this.NumberOfProductsInCart+=1;
    sessionStorage.setItem("NumberOfProductsInCart",`${this.NumberOfProductsInCart}`);

  }
  getCart(): ICart{
   return this.Cart;
  }
  getNumberOfProductInCart(): number{
    return  this.NumberOfProductsInCart;
  }
 
}
