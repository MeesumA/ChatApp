import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class SuperAdminComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  // Super Admin can create new users
  createUser() {
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    const isCreated = this.authService.register(this.username, this.password, 'User');
    if (isCreated) {
      this.successMessage = 'User created successfully!';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Username already exists or you lack the necessary permissions.';
      this.successMessage = '';
    }
    this.clearFields();
  }

  // Super Admin can delete users
  deleteUser() {
    if (!this.username.trim()) {
      this.errorMessage = 'Username is required to delete a user.';
      return;
    }

    const isDeleted = this.authService.removeUser(this.username);
    if (isDeleted) {
      this.successMessage = `User "${this.username}" deleted successfully!`;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'User not found or insufficient permissions.';
      this.successMessage = '';
    }
    this.clearFields();
  }

  private clearFields() {
    this.username = '';
    this.password = '';
  }
}
