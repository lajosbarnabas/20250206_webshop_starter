import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductModel } from '../models/product.model';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private config: ConfigService, 
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getProducts(){
    return this.http.get<ProductModel[]>(this.config.apiUrl + '/product').pipe(
      map((products) =>{
        products.forEach(product => {
          product.imageUrl = `${this.config.apiUrl}/product/image/${product.id}`;
        });
        return products;
      })
    )
  }

  getOrders(){
    return this.http.get<OrderModel[]>(`${this.config.apiUrl}/order`);

  }

  newOrder(productId: number){
    // if(!this.auth.loggedInUser){
    //   return;
    // }
    //Header küldése interceptorban van megoldva
    // const header: HttpHeaders = new HttpHeaders().set('Authorization', `${this.auth.loggedInUser.token}`);
    // return this.http.post(`${this.config.apiUrl}/order/${productId}`, {}, {headers: header});


    return this.http.post(`${this.config.apiUrl}/order/${productId}`, {});
  }
}
