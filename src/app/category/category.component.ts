import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route} from '@angular/router';
import { Category } from '../category';
import { Product } from '../../product';
import {ProductsService } from '../../products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css', '../promoted-products/promoted-products.component.css']
})
export class CategoryComponent implements OnInit {
  category: string;
  products: Product[] = [];
  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.category = this.activatedRoute.snapshot.paramMap.get('title');
    this.productsService.getProducts().subscribe(products => this.products = products);
  }

}
