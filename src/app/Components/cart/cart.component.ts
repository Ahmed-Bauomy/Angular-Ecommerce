import { ICartItem } from './../../ViewModels/Interfaces/icart-item';
import { ICart } from './../../ViewModels/Interfaces/icart';
import { ProductService } from './../../Services/product.service';
import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  Cart:ICart;
  public payPalConfig? :IPayPalConfig;
  payPalList:Array<{name: string,
                     quantity: string,
                     category: string,
                     unit_amount: {
                         currency_code: string,
                         value: string,
                       }
                    }>;
  public showSuccess:boolean;
  constructor(public _productService:ProductService) {
   }

  ngOnInit(): void {
    this.Cart=this._productService.getCart();
     this.initConfig();
  }
  RemoveFromCart(item:ICartItem){
    if(item.Quantity>1){
       item.Quantity--;
    }else{
          var index=this._productService.getCart().Items.indexOf(item);
          if(index>-1){
            this._productService.getCart().Items.splice(index,1);
          }
    }
    this._productService.getCart().TotalPrice-=item.product.Price;
    sessionStorage.setItem("Cart",JSON.stringify(this._productService.getCart()));
    this._productService.NumberOfProductsInCart--;
    sessionStorage.setItem("NumberOfProductsInCart",`${this._productService.NumberOfProductsInCart}`);

  }
   private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'Ac_a97vJb2sduNTKdBumtDi8Jr4Ez3N8W3squrZ8ir8Cfh1TDa-dbYkBcfTQ3xtVoiEYNjOuu7MCMU4i',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: `9.99`,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: `9.99`
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
     /* for(let i=0;i<this.Cart.Items.length;i++){
        console.log(i);
        this.payPalList[i]={
          name: this.Cart.Items[i].product.Name,
          quantity: `${this.Cart.Items[i].Quantity}` ,
          category: this.Cart.Items[i].product.Category.Name,
          unit_amount: {
                currency_code: 'USD',
                value: `${this.Cart.Items[i].product.Price}*${this.Cart.Items[i].Quantity}`,
              }
        }
      }*/
      console.log('onClick', data, actions);
    },
  };
  } 
}
