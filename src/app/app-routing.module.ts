import { RemoveProductComponent } from './Components/remove-product/remove-product.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { RegisterComponent } from './Components/register/register.component';
import { ErrorComponent } from './Components/error/error.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { CartComponent } from './Components/cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:"Cart",component:CartComponent},
  {path:"Home",component:HomeComponent},
  {path:"Login",component:LoginComponent},
  {path:"Register",component:RegisterComponent},
  {path:"Error",component:ErrorComponent},
  {path:"ProductDetails/:id",component:ProductDetailsComponent},
  {path:"EditProduct/:id",component:EditProductComponent},
  {path:"RemoveProduct/:id",component:RemoveProductComponent},
  {path:"AddProduct",component:AddProductComponent},
  {path:"",component:HomeComponent,pathMatch:"full"},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
