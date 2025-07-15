import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { order } from '../data-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {


  orderData:order[]|undefined;


  constructor(private products:ProductService,private router:Router){}

  ngOnInit():void{

    // this.products.orderList().subscribe((result)=>{
    //   this.orderData=result
    // })

    this.getOderList();

  }

  cancleOrder(orderId:string|undefined){
    orderId && this.products.cancleOrder(orderId).subscribe((result)=>{
    
      this.getOderList();

    })
  }

  getOderList(){
    this.products.orderList().subscribe((result)=>{
      this.orderData=result
    })
  }

}
