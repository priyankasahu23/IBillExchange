import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      bank: ['', [Validators.required]],  // Added bank selection
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { bank, username, password } = this.loginForm.value;

      if (!bank) {
        this.errorMessage = 'Please select a bank!';
        return;
      }

      if (username === 'admin' && password === 'admin123') {
        sessionStorage.setItem('userRole', 'Admin'); 
        sessionStorage.setItem('bank', bank); // Store selected bank
        this.router.navigate(['/dashboard']);
      } else if (username === 'sbiuser' && password === 'sbi123' && bank === 'SBI') {
        sessionStorage.setItem('userRole', 'SBI'); 
        sessionStorage.setItem('bank', bank);
        this.router.navigate(['/dashboard']);
      } else if (username === 'lbguser' && password === 'lbg123' && bank === 'LBG') {
        sessionStorage.setItem('userRole', 'LBG'); 
        sessionStorage.setItem('bank', bank);
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid username, password, or bank selection!';
      }
    }
  }
}
