import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css', '../promoted-products/promoted-products.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  constructor(private productsService: ProductsService) { }
  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.cartItems = this.productsService.cartItems;
  }
  buyItems() {
    this.productsService.buyItems();
  }
  emptyCart() {
    this.productsService.emptyCart();
  }
}
