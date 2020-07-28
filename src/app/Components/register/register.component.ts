import { Router } from '@angular/router';
import { UserService } from './../../Services/user.service';
import { IUser } from './../../ViewModels/Interfaces/iuser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  User:IUser;
  Loading:boolean;
  ModelState:string[];
  constructor(private _userService:UserService,private _router:Router) { 
    this.Loading=false;
    this.User={
      UserName:null,
      Email:null,
      Password:null,
      ConfirmPassword:null
    }
  }

  ngOnInit(): void {
  }

  CreateNewUser(){
    this.Loading=true;
    console.log(this.User);
    this._userService.Register(this.User,"2").subscribe(
    (data)=>{
      this.Loading=false;
      alert(data);
      this._router.navigate(["/Login"]);
      
    },
    (err)=>{
      this.Loading=false;
      if(err.error.ModelState!=null){
        this.ModelState=err.error.ModelState[""];
      }else{
        this.ModelState=["Unkown error" , "Try again later"];
      }
      
    }
    );
  }

}
