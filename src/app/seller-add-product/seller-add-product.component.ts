import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {

  addProductMessage:string|undefined;

  constructor(private product:ProductService){}

  submitAddProduct(data:product){
    console.warn(data);
    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result);
      if(result){
          this.addProductMessage="Product Upload Succesfully"
      }
      setTimeout(()=>(this.addProductMessage=undefined),3000)
      
    })
    

  }


price: string | number = '';

onPriceChange(value: string) {
  const parsed = parseFloat(value);
  this.price = isNaN(parsed)
    ? ''
    : new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(parsed);
}
}
