// import { CommonModule, NgIf, NgSwitch, NgSwitchCase,  } from '@angular/common';
// import { Component } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';
// import { ProductService } from '../services/product.service';
// import { product } from '../data-types';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [RouterLink,NgIf,NgSwitch,CommonModule,NgSwitchCase],
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent {

//   menuTypes:string='default';
//   sellerName:string="";
//   searchResult: product[] | undefined;
    //  cartItem:number=0;


//   constructor(private route:Router, private products:ProductService ){}

//   ngOnInit():void{
//     this.route.events.subscribe((val:any)=>{
//       console.warn(val);
//       if(val.url){
//         if(localStorage.getItem('seller')&&val.url.includes('seller')){
//           console.warn("in seller area");
//           this.  menuTypes='seller';
//           if(localStorage.getItem('seller')){
//             let sellerStore=localStorage.getItem('seller');
//             let sellerData=sellerStore && JSON.parse(sellerStore)[0];
//             this.sellerName=sellerData.name;
//           }

          
//         }else{
//           console.warn("outside seller");
//           this.  menuTypes='default';

//         }
//       }
      
//     })
//   }

//   logout(){
//     localStorage.removeItem('seller');
//     this.route.navigate(['/'])
//   }

//   searchProducts(query:KeyboardEvent){
//     if(query){
//       const element=query.target as HTMLInputElement;
//       this.products.searchProducts(element.value).subscribe((result)=>{
//         if(result.length>5){
//           result.length=5;
//         }
//         this.searchResult=result;
        
//       })
//     }

//   }
//    hideSearch(){
//       this.searchResult=undefined
//     }

//     redirectToDetails(id:string){
//       this.route.navigate([`/product-details/${id}`],{ skipLocationChange: false })

//     }

//   submitSearch(val:string){
//     this.route.navigate([`search/${val}`])
    
//   }

  


// }

import { CommonModule, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';
import { Location } from '@angular/common'; // 🔧 Added for route check
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, NgSwitch, CommonModule, NgSwitchCase],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuTypes: string = 'default';
  sellerName: string = '';
  searchResult: product[] | undefined;
  userName:string='';
  cartItem:number=0;

  constructor(
    private route: Router,
    private products: ProductService,
    private location: Location // 🔧 Injected here
  ) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      console.warn(val);
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn('in seller area');
          this.menuTypes = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        }else if(localStorage.getItem('user')){
          let userStore=localStorage.getItem('user');
          let userData=userStore && JSON.parse(userStore);
          this.userName=userData.name;
          this.menuTypes='user';
          this.products.getCartList(userData.id);
        } else {
          this.menuTypes = 'default';
        }
      }
    });

    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItem=JSON.parse(cartData).length
    }

    this.products.cartData.subscribe((items)=>{
        this.cartItem=items.length
    })
  }

  sellerlogout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userlogout(){
     localStorage.removeItem('user');
    this.route.navigate(['/']);
    this.products.cartData.emit([]);
  }

// userlogout() {
//   const guestBackup = localStorage.getItem('guestCartBackup');
//   localStorage.removeItem('user');

//   if (guestBackup) {
//     localStorage.setItem('localCart', guestBackup);
//     this.products.cartData.emit(JSON.parse(guestBackup));
//     this.cartItem = JSON.parse(guestBackup).length;
//     localStorage.removeItem('guestCartBackup'); // 🧹 Clean-up
//   } else {
//     this.products.cartData.emit([]);
//     this.cartItem = 0;
//   }

//   this.menuTypes = 'default';
//   this.route.navigate(['/']);
// }

  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.products.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id: string) {
    this.route.navigate([`/product-details/${id}`], { skipLocationChange: false });
  }

  // submitSearch(val: string) {
  //   const currentPath = this.location.path();

  //   if (currentPath.includes(`/search/${val}`)) {
  //     // Reload component if same query is searched again
  //     this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //       this.route.navigate([`search/${val}`]);
  //     });
  //   } else {
  //     this.route.navigate([`search/${val}`]);
  //   }

  //   this.searchResult = undefined; // Clear search list after submit
  // }

    submitSearch(val: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['search', val]);
    });

    this.searchResult = undefined;
  }
}


