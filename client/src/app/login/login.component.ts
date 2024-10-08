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

  constructor(private router: Router, private authService: AuthService) {}

    toggleRegistering(event: Event) {
    event.preventDefault(); 
    this.isRegistering = !this.isRegistering;
    this.errorMessage = ''; 
  }

  // Login function
  login() {
    if (this.authService.authenticate(this.username, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }

  // Register function
  register() {
    this.authService.register(this.username, this.password, this.role);
    this.errorMessage = 'Registration successful! You can now log in.';
    this.isRegistering = false;
  }
}
