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
  loginedUser;
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
    this.refresh();
    return this.http.post<any>('http://localhost:3000/api/user/add', user, this.httpOptions);
  }
  emptyCart() {
    this.cartItems = [];
    this.refresh();
  }
  login(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/user/login/', user, this.httpOptions);
  }
  addNewProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/api/products/newproduct/add', product, this.httpOptions);
  }
  refresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.location.path()]);
    });
  }

}
