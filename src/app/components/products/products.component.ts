import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products: ProductModel[] = [];

  constructor(
    private data: DataService
  ) {}

  ngOnInit(){
    this.data.getProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.error(error);
      },
    })
  }

  order(productId: number){
    this.data.newOrder(productId)?.subscribe({
      next: (response) =>{
        alert('Sikeres rendelés!')
      },
      error: (error) =>{
        console.error(error);
      }
    })
  }
}
