import { Router } from '@angular/router';
import { UserService } from './../../Services/user.service';
import { TokenData } from './../../ViewModels/Interfaces/token-data';
import { ProductService } from './../../Services/product.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  TokenParam:TokenData;

  constructor(public _productService: ProductService,
              public _UserService:UserService,private _router:Router) { 
                this.TokenParam={
                  access_token:null,
                  expires_in:null,
                  token_type:null,
                  userName:null,
                  RoleId:null
                };
                
  }

  ngOnInit(): void {
  }
  Logout(){
    sessionStorage.removeItem("AccessToken");
    this._router.navigate(["/Login"]);
   
     /*  this._UserService.Logout().subscribe(
         (data)=>{
           console.log(data);
           sessionStorage.removeItem("AccessToken");
           //window.location.reload();
           this._router.navigate(["/Login"]);

          },
         (err)=>console.log(err)
       )*/
  }

}
