import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { FontAwesomeModule, } from '@fortawesome/angular-fontawesome';
import { faTrash,faEdit  } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  imports: [FormsModule,NgFor,FontAwesomeModule,RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {

  productList:undefined|product[];
  productMessage:undefined|string;
  fatrash=faTrash;
  faedit =faEdit ;
  // productId: string | null = null;
 

  constructor(private products:ProductService){}

    

    ngOnInit():void{
    this.list();
    // this.productId = this.route.snapshot.paramMap.get('id');
    // console.log('Editing product ID:', this.productId);

    }
    deleteProduct(id:string){
      console.warn("test id",id);

      this.products.deleteProduct(id).subscribe((result)=>{
        if(result){
            this.productMessage="Product is deleted";
            this.list();
        }
       
      })

      setTimeout(()=>{
       return (this.productMessage=undefined)},3000
      );
      
    }

    list(){
        this.products.productList().subscribe((result)=>{
        console.warn(result);
        if(result){
        this.productList=result;
        }
      });
    }

  

}


