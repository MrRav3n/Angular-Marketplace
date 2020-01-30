import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ProductsService} from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../user-page/user-page.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  submit: boolean;
  products: Product[];
  buttonEnabled = true;
  res;
  constructor(private formBuilder: FormBuilder, private productsService: ProductsService) { }
  ngOnInit() {
    this.userForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
      }
    );
    if (this.productsService.loggedIn) {
      this.getUserProducts();
    }
  }
  isEmailCorrect() {
    return (this.submit && this.userForm.controls.email.errors != null);
  }
  isPasswordCorrect() {
    return (this.submit && this.userForm.controls.password.errors != null);
  }
  addMoney() {
    this.buttonEnabled = false;
    this.productsService.addMoney().subscribe();
    this.refresh();
    setTimeout(() => {
      this.buttonEnabled = true;
    }, 2000);
  }
  refresh() {
    this.productsService.login(this.productsService.loggedIn).subscribe(user => {
      this.productsService.loggedIn = user;
    });
  }
  onSubmit() {
    this.submit = true;
    if (this.userForm.invalid === true) {
      return;
    }
    this.productsService.login(this.userForm.value).subscribe(user => {
      if (!user) {
        this.res = `Can't login new user`;
        const elemement: HTMLElement = document.getElementById('clickButton') as HTMLElement;
        elemement.click();
      }
      this.productsService.loggedIn = user;
      this.getUserProducts();
    });
  }
  getUserProducts() {
    this.productsService.getUserProducts().subscribe(products => {
      this.products = products;
    });
  }
}
