import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule,RouterModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {

  productData:undefined|product;
  productMessage:undefined|string;
  productId: string | null = null;
  constructor(private route: ActivatedRoute,private products:ProductService){}

   ngOnInit():void{
   
    this.productId = this.route.snapshot.paramMap.get('id');
    console.warn(this.productId);
    this.productId && this.products.getProduct(this.productId).subscribe((data)=>{
      console.warn(data);
      this.productData=data;
      
    })
   }

  submitupdateProduct(data:product){
    console.warn(data);
    if(this.productData){
      data.id=this.productData.id;
    }
    this.products.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product Has Update";
      }
    });
    setTimeout(() => {
     return this.productMessage=undefined; 
    }, 3000);
    
  }
  updateProduct(){

  }


}
