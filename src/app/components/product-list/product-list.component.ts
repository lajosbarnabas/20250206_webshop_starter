import { Component } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { DataService } from '../../services/data.service';
import { ProductDetailsComponent } from "../product-details/product-details.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductDetailsComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: ProductModel[] = [];
  productUnderEdit: ProductModel | null = null;
  constructor(private dataService: DataService) {}

  ngOnInit(){
    this.dataService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.error(error.error?.message || error.meesage)
      }
    })
  }

  new(){
    this.productUnderEdit = {
      id: 0,
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      imageBase64: undefined,
    }
  }

  update(product: ProductModel){
    this.productUnderEdit = {...product};
  }

  delete(productId: number){

  }

  save(product: ProductModel){
    const index = this.products.findIndex(p => p.id == product.id);
    if(index == -1){
      this.products.push(product);
    }
    else{
      this.products[index] = product;
    }

    this.productUnderEdit = null;
  }
}
