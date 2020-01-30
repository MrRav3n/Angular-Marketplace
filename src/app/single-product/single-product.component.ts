import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css', '../promoted-products/promoted-products.component.css']
})
export class SingleProductComponent implements OnInit {
  product: Product;
  id: number;
  res: string;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService) { }
  ngOnInit() {
    this.getProduct();
  }
  getProduct() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService.getProduct(this.id).subscribe(products => {
      this.product = products;
    });
  }
  addToCart() {
    this.productService.addToCart(this.product);
  }
  buyItems() {
    this.productService.buyProduct(this.product, this.productService.loggedIn).subscribe(res => {
      this.res = res.message;
      const elemement: HTMLElement = document.getElementById('clickButton') as HTMLElement;
      elemement.click();
    });
  }
}
