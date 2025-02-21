import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  @Input() product: ProductModel = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    imageBase64: undefined,
  };

  @Output() canceled = new EventEmitter<void>();
  @Output() saved = new EventEmitter<ProductModel>();
  errorMessage: string = '';

  constructor(private dataService: DataService) {}

  save(){
    if(!this.product.name || !this.product.price || this.product.description){
      this.errorMessage = 'A név, az ár, a termék leírás és a kép megadása kötelező!';
      return;
    }
    this.dataService.saveProduct(this.product).subscribe({
      next: (response) => {
        this.saved.emit(response);
      },
      error: (error) => {
        this.errorMessage = error.error.message ?? error.message ?? "A mentés során hiba történt!";
      }
    })
  }

  cancel(){
    this.canceled.emit();
  }

  imageChanged(event: Event){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>{
        this.product.imageBase64 = reader.result?.toString().split(',')[1];
      }
    }
  }
}
