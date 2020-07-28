import { TokenData } from './../../ViewModels/Interfaces/token-data';
import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Password:string;
  UserName:string;
  TokenParams:TokenData;
  ErrorMessage:string;
  Loading:boolean;
  constructor(private _userService:UserService,private _router:Router,private _loc:Location) { }

  ngOnInit(): void {
    this.Loading = false;
  }

  Login(){
    this.Loading = true;
   this._userService.Login(this.UserName,this.Password).subscribe(
     (data)=>{
       this.Loading=false;
       this.TokenParams=data;
       this._userService.TokenDataOfService=this.TokenParams;
       sessionStorage.setItem("AccessToken",JSON.stringify( this.TokenParams));
       this._router.navigate(["/Home"]);
    
      },
     (err)=>{
       this.Loading=false;
       this.ErrorMessage=err.error.error_description;
      }
   )
  }

}
