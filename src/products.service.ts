import { Injectable } from '@angular/core';
import { Product } from './product';
import { PRODUCTS } from './products-list';
import {Observable, of} from 'rxjs';
import { CATEGORIES } from './categories';
import { Category } from './app/category';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartItems: Product[] = [];
  constructor() { }
  getProducts(): Observable <Product[]> {
    return of(PRODUCTS);
  }
  getProduct(id: number): Observable<Product> {
    return of(PRODUCTS.find(product => product.id === id));
  }
  getCategories(): Observable<Category[]> {
    return of(CATEGORIES);
  }
  addToCart(product: Product) {
    this.cartItems.push(product);
  }
  buyItems() {
    this.cartItems = [];
    window.alert('You bought it!');
  }

}
