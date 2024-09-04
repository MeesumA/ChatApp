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
  selectedUser: string = '';
  selectedRole: string = 'Group Admin'; // Default role for promotion
  removeUsername: string = '';

  constructor(private authService: AuthService) {}

  promoteUser() {
    if (this.selectedRole === 'Group Admin') {
      this.authService.promoteToGroupAdmin(this.selectedUser);
    } else if (this.selectedRole === 'Super Admin') {
      this.authService.promoteToSuperAdmin(this.selectedUser);
    }
    this.selectedUser = ''; // Reset input
  }

  removeUser() {
    this.authService.removeUser(this.removeUsername);
    this.removeUsername = ''; // Reset input
  }
}