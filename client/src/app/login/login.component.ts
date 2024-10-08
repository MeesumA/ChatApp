import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string = 'User';
  errorMessage: string = '';
  isRegistering: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    // Redirect to chat if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/chat']);
    }
  }

  toggleRegistering(event: Event) {
    event.preventDefault();
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
  }

  // Login function
  login() {
    if (this.authService.authenticate(this.username, this.password)) {
      this.router.navigate(['/chat']);  // Redirect to chat after login
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }

  // Register function
  register() {
    if (this.authService.register(this.username, this.password, this.role)) {
      this.errorMessage = 'Registration successful! You can now log in.';
      this.isRegistering = false;
    } else {
      this.errorMessage = 'Username already exists. Please try again.';
    }
  }
}
