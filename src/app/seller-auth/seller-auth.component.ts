import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-types';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule,NgIf],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  constructor(private seller:SellerService,private router:Router){ }

  showLogice=true;
  authError:string='';
  

  ngOnInit():void{
    this.seller.reloadSeller()
  }

    signUp(data:SignUp):void {

       console.warn(data)
       this.seller.userSignUp(data)

      // .subscribe((result)=>{
      //   if(result){
      //     this.router.navigate(['seller-home'])
      // }
      // });
    }

    login(data:SignUp):void {
      this.authError="";

      //  console.warn(data)

      this.seller.userLogin(data);
       this.seller.isLoginError.subscribe((isError)=>{
        if(isError){
            this.authError="Email or P assword is not valid";
        }
       })


    }

    openLogin(){
      this.showLogice=true;
    }
    openSignup(){
      this.showLogice=false;
    }

}
