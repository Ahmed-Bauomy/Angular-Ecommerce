import { ICartItem } from './icart-item';
export interface ICart {
  Items: ICartItem[];
  TotalPrice: number;
}
