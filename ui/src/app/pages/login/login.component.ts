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
      //bank: ['', [Validators.required]],  // Bank selection
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
     // role: ['', [Validators.required]],  // Role selection (Buyer/Seller)
    });
  }

  onLogin() {
      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;

       /* if (!bank) {
          this.errorMessage = 'Please select a bank!';
          return;
        }*/

        if (username === 'admin' && password === 'admin123') {
          sessionStorage.setItem('userRole', 'Admin');
          //sessionStorage.setItem('bank', bank); // Store selected bank
          this.router.navigate(['/buyer-dashboard']);
        } else if (username === 'sbiuser' && password === 'sbi123') {
          sessionStorage.setItem('userRole', 'SBI');
          //sessionStorage.setItem('bank', bank);
          this.router.navigate(['/dashboard']);
        } else if (username === 'lbguser' && password === 'lbg123' )  {
          sessionStorage.setItem('userRole', 'Buyer');
          //sessionStorage.setItem('bank', bank);
          this.router.navigate(['/buyer-dashboard']);
        }else if (username === 'rbi' && password === 'rbi123' )  {
          sessionStorage.setItem('userRole', 'Buyer');
          //sessionStorage.setItem('bank', bank);
          this.router.navigate(['/compliance-dashboard']);
        } else if (username === 'icici' && password === 'icici123' )  {
          sessionStorage.setItem('userRole', 'Buyer');
          //sessionStorage.setItem('bank', bank);
          this.router.navigate(['/compliance-dashboard']);
        } 
        
        else {
          this.errorMessage = 'Invalid username, password, or bank selection!';
        }
    }
  //   if (this.loginForm.invalid) {
  //     this.errorMessage = 'All fields are required!';
  //     return;
  //   }
  //
  //   const { bank, username, password, role } = this.loginForm.value;
  //
  //   const users = [
  //     { username: 'admin', password: 'admin123', role: 'Admin', bank: 'ANY' },
  //     { username: 'sbibuyer', password: 'buyer123', role: 'Buyer', bank: 'SBI', dashboard: '/buyer-dashboard' },
  //     { username: 'sbiuser', password: 'sbi123', role: 'Seller', bank: 'SBI', dashboard: '/dashboard' },
  //     { username: 'lbgbuyer', password: 'buyer123', role: 'Buyer', bank: 'LBG', dashboard: '/buyer-dashboard' },
  //     { username: 'lbguser', password: 'lbg123', role: 'Seller', bank: 'LBG', dashboard: '/dashboard' }
  //   ];
  //
  //   const validUser = users.find(user => user.username === username && user.password === password && (user.bank === bank || user.bank === 'ANY') && user.role === role);
  //
  //   if (validUser) {
  //     sessionStorage.setItem('userRole', validUser.role);
  //     sessionStorage.setItem('bank', bank);
  //     this.router.navigate([validUser.dashboard || '/dashboard']);
  //   } else {
  //     this.errorMessage = 'Invalid credentials! Please check username, password, bank, or role.';
  //   }
  }
}
