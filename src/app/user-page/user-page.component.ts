import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private router: Router) { }
  res;
  ngOnInit() {
    this.routeToLoggined();
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      check: ['', Validators.required]
    });
  }
  nameCheck() {
    return (this.submitted && this.userForm.controls.email.errors != null);
  }
  passCheck() {
    return (this.submitted && this.userForm.controls.password.errors != null);
  }
  checkCheck() {
    return (this.submitted && this.userForm.controls.check.errors != null);
  }
  submit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.productsService.register(this.userForm.value).subscribe(res => {
      this.res = res.message;
      const elemement: HTMLElement = document.getElementById('clickButton') as HTMLElement;
      elemement.click();
    });
  }
  routeToLoggined() {
    if (this.productsService.loggedIn) {
      this.router.navigateByUrl('/userPage/login');
    }
  }
}
