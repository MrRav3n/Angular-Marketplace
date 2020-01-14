import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Category } from '../category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.productService.getCategories().subscribe(categories => this.categories = categories);
  }

}
