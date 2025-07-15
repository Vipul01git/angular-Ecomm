import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {


  productsData:undefined|product;
  productQuantity:number=1;
  removeCart:boolean=false;
  cartData:product | undefined;
  

    constructor(private activeRoute:ActivatedRoute, private products:ProductService){}

    ngOnInit():void{
      let productId=this.activeRoute.snapshot.paramMap.get('productId');
      // productId && this.products.getProduct(productId!).subscribe((result)=>{
      //     this.productsData=result;
      // })
      if (productId) {
  this.products.getProduct(productId).subscribe((result) => {
    this.productsData = result;

    let cartData=localStorage.getItem('localCart')
    if(productId && cartData){
      let items=JSON.parse(cartData);
      items=items.filter((item:product)=>productId==item.id.toString());
    
      if(items.length){
        this.removeCart=true;
      }else{
        this.removeCart=false;
      }
    }


    let user=localStorage.getItem('user');

    if(user){
      let userId=user && JSON.parse(user).id;
      this.products.getCartList(userId);
      this.products.cartData.subscribe((result)=>{
      let item=  result.filter((item:product)=>productId?.toString()===item.productId?.toString())
      if(item.length){
        this.cartData=item[0];
        this.removeCart=true;
      }
      })
    }
        

  });
  }
  }

  handelQuantity(val:string){
    if(this.productQuantity<100 && val==='max'){
      this.productQuantity=this.productQuantity+1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity=this.productQuantity-1;
    }
  }

  addToCart(){
    if(this.productsData){
      this.productsData.quantity=this.productQuantity;
      if(!localStorage.getItem('user')){

        this.products.localAddToCart(this.productsData)
        this.removeCart=true;
      }else{
        let user=localStorage.getItem('user')
        let userId=user && JSON.parse(user).id
        // let cartData:cart={
        //   ...this.productsData,
        //   userId,
        //   productId:this.productsData.id,
        // }
        // delete cartData.id ;

        const { id, ...productInfo } = this.productsData;
      let cartData: cart = {
        ...productInfo,
        userId,
        productId:this.productsData.id,
        quantity: this.productQuantity
      };


        this.products.addToCart(cartData).subscribe((result)=>{
          console.warn(result);
          
            if(result){
              this.products.getCartList(userId);
              this.removeCart=true;
            }
        })
        
      }
    }
  }

  removeToCart(productId:string){
      if(!localStorage.getItem('user')){

    this.products.removeItemFromCart(productId);
    
    }else{
       let user=localStorage.getItem('user')
        let userId=user && JSON.parse(user).id
        console.warn(this.cartData);
        this.cartData && this.products.removeToCart(this.cartData.id).subscribe((result)=>{
          if(result){
            this.products.getCartList(userId);
          }
        })

        this.removeCart=false;

      }
  }
  
  
}
