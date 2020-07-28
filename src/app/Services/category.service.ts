import { ICategory } from './../ViewModels/Interfaces/icategory';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  Categories: ICategory[];
  baseUrl:string;
  constructor(private _http:HttpClient) { 
    this.baseUrl="https://localhost:44340";
    /*this.Categories = [
      {Id: 1, Name: 'Cat 1', Products: null},
      {Id: 2, Name: 'Cat 2', Products: null},
      {Id: 3, Name: 'Cat 3', Products: null},
    ];*/
  }

  getAllCategories():Observable<ICategory[]>{
    return this._http.get<ICategory[]>(this.baseUrl+"/api/Category");
  }
}
