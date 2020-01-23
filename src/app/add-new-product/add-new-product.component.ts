import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../category';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css', '../user-page/user-page.component.css']
})
export class AddNewProductComponent implements OnInit {
  categories: Category[];
  productForm: FormGroup;
  submited: boolean;
  constructor(private productsService: ProductsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['IT', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      check: ['']
    });
    this.productsService.getCategories().subscribe(category => this.categories = category);
    console.log(this.categories);
  }
  isNameCorrect() {
    return (this.submited && this.productForm.controls.name.errors != null);
  }
  isCategoryCorrect() {
    return (this.submited && this.productForm.controls.category.errors != null);
  }
  isDescriptionCorrect() {
    return (this.submited && this.productForm.controls.description.errors != null);
  }
  isPriceCorrect() {
    return (this.submited && this.productForm.controls.price.errors != null);
  }

  submit() {
    this.submited = true;
    if (this.productForm.invalid) {
      return;
    }
    this.productsService.addNewProduct(this.productForm.value, this.productsService.loginedUser).subscribe();
  }

}
