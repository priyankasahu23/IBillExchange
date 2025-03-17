import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;

        if (username === 'admin' && password === 'admin123') {
          sessionStorage.setItem('userRole', 'Admin');
          this.router.navigate(['/buyer-dashboard']);
        } else if (username === 'lbguser' && password === 'lbg123' )  {
          sessionStorage.setItem('userRole', 'Seller');
          this.router.navigate(['/dashboard']);
        } else if (username === 'sbiuser' && password === 'sbi123') {
          sessionStorage.setItem('userRole', 'Buyer');
          this.router.navigate(['/dashboard']);
        }else if (username === 'rbi' && password === 'rbi123' )  {
          sessionStorage.setItem('userRole', 'RBI');
          this.router.navigate(['/compliance-dashboard']);
        } else if (username === 'boe' && password === 'boe123' )  {
          sessionStorage.setItem('userRole', 'BOE');
          this.router.navigate(['/compliance-dashboard']);
        }

        else {
          this.errorMessage = 'Invalid username, password, or bank selection!';
        }
    }

  }
}
