import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Product } from '../../product';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css', '../promoted-products/promoted-products.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  constructor(private productsService: ProductsService, private router: Router, private location: Location) { }
  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.cartItems = this.productsService.cartItems;
  }
  buyItems() {
    this.productsService.buyItems();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.location.path()]);
    });
  }
}
