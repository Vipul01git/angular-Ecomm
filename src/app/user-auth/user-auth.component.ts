import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, login, product, SignUp } from '../data-types';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule, FormsModule, ],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  showLogin:boolean=false;
  authError:string="";

  constructor(private user:UserService,private products:ProductService){}

  ngOnInit():void{
    this.user.userAuthReload();
  }

  signUp(data:SignUp){
    this.user.userSignUp(data)  
  }
  login(data:login){
     this.user.userLogin(data)
     this.user. isLoginError.subscribe((result)=>{

      if(result){
        this.authError="please use valid user id & password"
      }else{
        this.localCartToRemoteCart();
      }
     })

  }
  openSignup(){
    this.showLogin=true;
  }
  openLogin(){
    this.showLogin=false;
  }

  // localCartToRemoteCart(){
  //   let data=localStorage.getItem ('localCart');
  //   let user=localStorage.getItem('user')
  //   let userId=user && JSON.parse(user).id
    
  //   if(data){
  //    let cartDataList=JSON.parse(data)
  //     let user=localStorage.getItem('user')
  //     let userId=user && JSON.parse(user).id

  //     cartDataList.forEach((product:product,index: any)=>{
  //       let cartData:cart={
  //         ...product,
  //         productId:product.id,
  //         userId
  //       };

  //       delete cartData.id
  //       setTimeout(() => {
  //         this.products.addToCart (cartData).subscribe((result)=>{
  //         if(result){
  //           console.warn("item stored in db");
  //         }
  //       })
  //     }, 500);
  //       if(cartDataList.length===index+1){
  //           localStorage.removeItem('localCart');
  //       }
  //     })
  //   }

  //   setTimeout(() => {
  //     this.products.getCartList(userId);
  //   }, 2000);

  // }

  localCartToRemoteCart() {
  let data = localStorage.getItem('localCart');
  let user = localStorage.getItem('user');
  let userId = user && JSON.parse(user).id;

  if (data) {
    const cartDataList = JSON.parse(data);

    cartDataList.forEach((product: product, index: number) => {
      let { id, ...productInfo } = product;
      let cartData: cart = {
        ...productInfo,
        productId:product.id,
        userId
      };

      console.log('Syncing to DB:', cartData); // optional debug log

      setTimeout(() => {
        this.products.addToCart(cartData).subscribe((result) => {
          if (result) {
            console.warn("Item stored in DB");
          }
        });
      }, 500);

      if (cartDataList.length === index + 1) {
        localStorage.removeItem('localCart');
      }
    });
  }

  setTimeout(() => {
    this.products.getCartList(userId);
  }, 2000);
}


}
