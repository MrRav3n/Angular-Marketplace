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

  constructor() { }
  getProducts(): Observable <Product[]> {
    return of(PRODUCTS);
  }
  getCategories(): Observable<Category[]> {
    return of(CATEGORIES);
  }

}
