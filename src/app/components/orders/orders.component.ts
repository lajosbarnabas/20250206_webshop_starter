import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: OrderModel[] = [];

  constructor(
    private data: DataService,
  ) {}

  ngOnInit(){
    this.data.getOrders().subscribe({
      next: (response) =>{
        this.orders = response;
      },
      error: (error) =>{
        console.log(error);
        alert(error.error.message ?? error.message ?? 'Hiba történt!');
      }
    });
  }
}
