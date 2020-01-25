import { Injectable } from '@angular/core';
import { Product } from './product';
import {Observable, of} from 'rxjs';
import { Category } from './category';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartItems: Product[] = [];
  loggedIn: User;
  path = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private router: Router, private location: Location, private http: HttpClient) { }
  getProducts(): Observable <Product[]> {
    return this.http.get<Product[]>(this.path + '/api/products');
  }
  getUserProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.path + `/api/user/getProducts/${this.loggedIn.email}`);
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.path + `/api/products/${id}`);
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.path + '/api/categories/');
  }
  addToCart(product: Product) {
    this.cartItems.push(product);
  }
  register(user: User): Observable<User> {
    this.refresh();
    return this.http.post<User>(this.path + '/api/user/add', user, this.httpOptions);
  }
  emptyCart() {
    this.cartItems = [];
    this.refresh();
  }
  login(user: User): Observable<User> {
    return this.http.post<User>(this.path + '/api/user/login/', user, this.httpOptions);
  }
  addNewProduct(product: Product, user: User): Observable<Product> {
    return this.http.post<Product>(this.path + '/api/products/newproduct/add', [product, user], this.httpOptions);
  }
  refresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.location.path()]);
    });
  }
  addMoney(): Observable<any> {
    return this.http.post(this.path + '/api/user/addMoney', this.loggedIn, this.httpOptions);
  }
  buyProduct(product: Product, user: User): Observable<any> {
    return this.http.post<[Product, User]>(this.path + '/api/products/product/buy', [product, user], this.httpOptions);
  }
  buyAllProduct(product: Product[], user: User): Observable<any> {
    return this.http.post<[Product[], User]>(this.path + '/api/products/product/buy/all', [product, user], this.httpOptions);
  }
}
