import { Component, NgModule } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';
import { FormsModule } from '@angular/forms';
import { CommonModule,  } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule,FormsModule,CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  popularsProducts:undefined|product[];
  trendysProducts:undefined|product[];
  constructor(private products:ProductService){}

  ngOnInit():void{
    this.products.popularProducts().subscribe((data)=>{
      console.warn(data);
       this.popularsProducts=data;
    });
    this.products.trendyProducts().subscribe((data)=>{
      console.warn(data);
       this.trendysProducts=data;
    });
  }
}

