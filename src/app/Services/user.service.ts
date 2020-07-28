import { IUser } from './../ViewModels/Interfaces/iuser';
import { TokenData } from './../ViewModels/Interfaces/token-data';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from  '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   TokenDataOfService:TokenData;
   baseUrl:string;
  constructor(private _http:HttpClient) {
    this.baseUrl="https://localhost:44340";
    this.TokenDataOfService=JSON.parse(sessionStorage.getItem("AccessToken"));
   }

  Login(userName:string,password:string):Observable<TokenData>{
    var loginHeader = new HttpHeaders({
      'content-type':'Application/x-www-form-urlencoded'
    });
    var data="grant_type=password&username=" + userName + "&password=" + password;
   return this._http.post<TokenData>(`${this.baseUrl}/Token`,data,{ headers:loginHeader });
  }
  
  Logout(){
    var logoutHeader=new HttpHeaders();
    /*var logoutHeader=new HttpHeaders({
      'Authorization':`Bearer ${this.TokenDataOfService.access_token}`
    });*/
    logoutHeader.append('Authorization','Bearer '+ this.TokenDataOfService.access_token);
    return this._http.post(`${this.baseUrl}/api/Account/Logout`," ",{ headers:logoutHeader });
  }
  Register(User:IUser,rolId:string){
    var RegisterHeader=new HttpHeaders({
      'content-type':'application/json'
    });
  return this._http.post(`${this.baseUrl}/api/Account/Register/${rolId}`,User);
  }

  getTokenParams(): TokenData{
    if(sessionStorage.getItem("AccessToken")!=null){
      return JSON.parse(sessionStorage.getItem("AccessToken"));
    }
    var dummy:TokenData={
      access_token:null,
      token_type:null,
      expires_in:null,
      userName:null,
      RoleId:null
    }
    return dummy;
   
  }
  IsUserLogin():boolean{
    if(this.getTokenParams().access_token!=null){
      return true;
    }else{
      return false;
    }
  }
}
