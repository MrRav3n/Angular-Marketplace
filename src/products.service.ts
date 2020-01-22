import { Injectable } from '@angular/core';
import { Product } from './product';
import {Observable, of} from 'rxjs';
import { CATEGORIES } from './categories';
import { Category } from './app/category';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartItems: Product[];
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private router: Router, private location: Location, private http: HttpClient) { }
  getProducts(): Observable <Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api/products');
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/api/products/${id}`);
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
    this.refresh();
  }
  register(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/user/add', user, this.httpOptions);
    this.refresh();
  }
  emptyCart() {
    this.cartItems = [];
    this.refresh();
  }
  refresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.location.path()]);
    });
  }

}
