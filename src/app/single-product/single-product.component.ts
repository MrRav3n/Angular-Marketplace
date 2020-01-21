import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../products.service';
import { Product } from '../../product';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css', '../promoted-products/promoted-products.component.css']
})
export class SingleProductComponent implements OnInit {
  product: Product;
  id: number;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.productService.getProduct(this.id).subscribe(products => this.product = products);
  }
  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
  buyItems() {
    this.productService.buyItems();
  }

}
