import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {


  searchResults:undefined|product[];

  constructor(private activeRoute:ActivatedRoute, private products:ProductService){}
    
  // ngOnInit():void{
  //   let query=this.activeRoute.snapshot.paramMap.get('query');
  //   query&& this.products.searchProducts(query).subscribe((result)=>{
  //     this.searchResults=result
  //   })
  // }

  ngOnInit(): void {
  this.activeRoute.paramMap.subscribe(params => {
    const query = params.get('query');
    if (query) {
      this.products.searchProducts(query).subscribe((result) => {
        this.searchResults = result;
      });
    }
  });
}

}
