import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, product, SignUp } from '../data-types';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

    isLoginError=new EventEmitter <boolean>(false);


  constructor(private http:HttpClient, private router:Router,private products: ProductService) { }

  getCurrentUser(): SignUp | null {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return null;
    }
  }


  userSignUp(data:SignUp){
  
      this.http.post('http://localhost:3000/users',data,
        {observe:'response'}).subscribe((result)=>{
  
        if(result){
  
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])
        }
      })  
     
      
    }

 userLogin(data:login){
    console.warn(data);
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
      {observe:'response'}).subscribe((result:any)=>{
      
        if(result&&result.body&&result.body?.length){
        console.warn("user loged in");
        this.isLoginError .emit(false)
        localStorage.setItem('user',JSON.stringify(result.body[0]))
        this.router.navigate(['/'])
      }else{
        console.warn("login faield");
        this.isLoginError .emit(true)
        
      }
    })
    
  }

// userLogin(data: login) {
//   console.warn(data);

//   // ✅ Backup guest cart before overwrite
//   const guestCart = localStorage.getItem('localCart');
//   if (guestCart) {
//     localStorage.setItem('guestCartBackup', guestCart);
//   }

//   this.http.get<SignUp[]>(
//     `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
//     { observe: 'response' }
//   ).subscribe((result: any) => {
//     if (result && result.body && result.body.length) {
//       console.warn('user logged in');
//       this.isLoginError.emit(false);

//       const userData = result.body[0];
//       localStorage.setItem('user', JSON.stringify(userData));

//       // ✅ Push guestCart items to backend cart
//       const guestBackup = localStorage.getItem('guestCartBackup');
//       if (guestBackup) {
//         const guestItems: product[] = JSON.parse(guestBackup);

//         guestItems.forEach(item => {
//           const cartItem = {
//             ...item,
//             productId: item.id,
//             userId: userData.id,
//           };

//           // 🔁 Add each item to backend
//           this.products.addToCart(cartItem).subscribe(() => {
//             console.log(`Item ${item.name} added to user ${userData.name}'s cart`);
//           });
//         });
//       }

//       // 🧹 Clean up
//       localStorage.removeItem('localCart');
//       localStorage.removeItem('guestCartBackup');

//       this.router.navigate(['/']);
//     } else {
//       console.warn('login failed');
//       this.isLoginError.emit(true);
//     }
//   });
// }

    userAuthReload(){
      if(localStorage.getItem('user')){
        this.router.navigate(['/'])
      }
    }
}
