import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {timestamp} from 'rxjs/operators';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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
  }
}
