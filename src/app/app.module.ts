import { DashboardModule } from './dashboard/dashboard.module';
import { NgxPayPalModule } from 'ngx-paypal';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProductsComponent } from './Components/products/products.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './Components/cart/cart.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './Components/error/error.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { RemoveProductComponent } from './Components/remove-product/remove-product.component';
import { UserLayoutComponent } from './Components/user-layout/user-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    CategoriesComponent,
    CartComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    AddProductComponent,
    ProductDetailsComponent,
    EditProductComponent,
    RemoveProductComponent,
    UserLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxPayPalModule,
    DashboardModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
