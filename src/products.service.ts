import { Injectable } from '@angular/core';
import { Product } from './product';
import { PRODUCTS } from './products-list';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor() { }

  getProducts(): Observable <Product[]> {
    return of(PRODUCTS);
  }

}
