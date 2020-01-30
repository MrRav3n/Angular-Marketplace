import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-promoted-products',
  templateUrl: './promoted-products.component.html',
  styleUrls: ['./promoted-products.component.css']
})
export class PromotedProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private productsService: ProductsService) { }
  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
      this.productsService.getProducts().subscribe(products => this.products = products);
  }
}
