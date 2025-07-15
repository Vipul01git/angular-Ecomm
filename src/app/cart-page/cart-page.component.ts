import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary, product } from '../data-types';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

  cartsData:cart[] |undefined;
  priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }

  productsData:undefined|product;
  productQuantity:number=1;
  removeCart:boolean=false;
  cartData:product | undefined;

  constructor(private products:ProductService,private router:Router){}

  ngOnInit():void{
   this.loadDetails();
  }

  removeToCart(cartId: string | undefined): void {
  // const index = this.cartsData.findIndex(item => item.id === id);
  // if (index > -1) {
  //   this.cartsData.splice(index, 1);
  // }

          cartId && this.products.removeToCart(cartId).subscribe((result)=>{
          this.loadDetails();
          
        })

   }

   loadDetails(){
     this.products.currentCart().subscribe((result)=>{
      this.cartsData=result;
      let price=0;
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

      if(!this.cartsData.length){
        this.router.navigate(['/'])
      }

    })
   }

checkout(){
  this.router.navigate(['/checkout'])
}

}
