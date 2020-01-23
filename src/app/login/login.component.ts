import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ProductsService} from '../../products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../user-page/user-page.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  submit: boolean;
  loginedUser;
  constructor(private formBuilder: FormBuilder, private productsService: ProductsService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
      }
    );
  }

  isEmailCorrect() {
    return (this.submit && this.userForm.controls.email.errors != null);
  }
  isPasswordCorrect() {
    return (this.submit && this.userForm.controls.password.errors != null);
  }

  onSubmit() {
    this.submit = true;
    if (this.userForm.invalid === true) {
      return;
    }
    this.productsService.login(this.userForm.value).subscribe(user => {
      this.productsService.loginedUser = user;
      this.loginedUser = user;
    });
  }

}
