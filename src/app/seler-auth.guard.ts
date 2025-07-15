import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core';

export const selerAuthGuard:
// Constructor(private sellerService:SellerService){};
 CanActivateFn = (route, state) => {
  const sellerService= inject( SellerService);
    if(localStorage.getItem('seller')){
   return true;
    }
  return sellerService.isSellerLoggedIn ;
};
