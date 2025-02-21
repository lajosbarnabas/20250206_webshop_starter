import { Component, ɵsetCurrentInjector } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ProductModel } from '../../models/product.model';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ForintPipe } from "../../misc/forint.pipe";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [UpperCasePipe, ForintPipe],
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
