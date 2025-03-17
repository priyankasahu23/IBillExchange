import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      sellerName: ['', Validators.required],
      sellerCN: ['', Validators.required],
      country: ['', Validators.required],
      location: ['', Validators.required],
      ou: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Registered Details:', this.registerForm.value);
      alert('Registration Successful!');
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  closeForm() {
    this.router.navigate(["/login"]);
  }
}
