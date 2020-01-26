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
  res: string;
  constructor(private productsService: ProductsService) { }
  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.cartItems = this.productsService.cartItems;
  }
  buyAllItems() {
    this.productsService.buyAllProduct(this.cartItems, this.productsService.loggedIn).subscribe(res => {
      this.res = res.message;
      const elemement: HTMLElement = document.getElementById('clickButton') as HTMLElement;
      elemement.click();
    });
  }
  emptyCart() {
    this.productsService.emptyCart();
  }
}
