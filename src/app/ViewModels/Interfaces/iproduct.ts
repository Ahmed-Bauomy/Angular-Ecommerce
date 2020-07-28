import { ICategory } from './icategory';

export interface IProduct {
  Id: number;
  Name: string;
  Price: number;
  Details: string;
  Quantity: number;
  OriginalQuantity: number;
  Image: string;
  CategoryId: number;
  Category:ICategory;
}
