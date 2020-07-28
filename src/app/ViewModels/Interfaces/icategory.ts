import { IProduct } from './iproduct';
export interface ICategory {
  Id: number;
  Name: string;
  Products: IProduct[];
}
