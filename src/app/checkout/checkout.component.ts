import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { cart, order, priceSummary } from '../data-types';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  totalPrice:undefined|number;
  cartData:cart[]|undefined;
  orderMsg:string;
   priceSummary:priceSummary={
      price:0,
      discount:0,
      tax:0,
      delivery:0,
      total:0
    }
  

  constructor(private products:ProductService,private router:Router){}

  ngOnInit():void{
    this.products.currentCart().subscribe((result)=>{
      
      let price=0;
      this.cartData=result;
      result.forEach((item)=>{
        if(item.quantity){
        price=price+(+item.price)
        }
      })

      this.priceSummary.price=price;
      this.priceSummary.discount=price/10;
      this.priceSummary.tax=price/10;
      this.priceSummary.delivery=45;
      this.priceSummary.total = price - this.priceSummary.discount +this.priceSummary.tax + this.priceSummary.delivery;

      this.totalPrice=this.priceSummary.total;
    })
  }



  orderNow(data:{email:string,address:string,contact:string}){
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;

    if (!userId) {
    alert('Login required to place order');
    this.router.navigate(['/user-auth']);
    return;
  }


    if(this.totalPrice && userId){
      let oderData:order ={
        ...data,
        totalPrice: this.totalPrice,
        userId: userId,
        id:undefined,
        image:undefined
      };

      this.cartData?.forEach((item)=>{
        setTimeout(() => {
         item.id && this.products.deleteCartItem(item.id);
        }, 1000);
      })

      this.products.orderNow(oderData).subscribe((result)=>{
        if(result){
          this.orderMsg="Your Order has been Placed"
          setTimeout(() => {
            this.router.navigate(['/my-orders'])
            this.orderMsg=undefined
          }, 4000);
        }
      })
    }
 }








}
