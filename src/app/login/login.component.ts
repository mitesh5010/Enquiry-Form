import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;
  loginError = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        this.customEmailValidator
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
    });

    // Clear error message when user starts typing
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginError) {
        this.loginError = '';
      }
    });
  }

  // Custom email validator
  private customEmailValidator(control: any) {
    const email = control.value;
    if (!email) return null;
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) ? null : { email: true };
  }


  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.loginError = '';

      const { email, password } = this.loginForm.value;
      this.auth.login(email, password).subscribe({
        next: (response) => {
          if (response.user.role === 'admin') {
            this.router.navigate(['/forms']);
          } else {
            this.loginError = 'Access denied: Admin role required';
            this.auth.logout();
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.handleLoginError(err);
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private handleLoginError(error: any): void {
    console.error('Login error:', error);
    
    // Handle different types of errors
    if (error.message) {
      this.loginError = error.message;
    } else if (error.status === 401) {
      this.loginError = 'Invalid email or password.';
    } else if (error.status === 429) {
      this.loginError = 'Too many login attempts. Please try again later.';
    } else if (error.status === 500) {
      this.loginError = 'Server error. Please try again later.';
    } else {
      this.loginError = 'An unexpected error occurred. Please try again.';
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

}
