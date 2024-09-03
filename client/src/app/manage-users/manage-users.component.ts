import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model'; // Import User model or interface
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  imports: [FormsModule, CommonModule], // Add FormsModule to imports
  providers: [AuthService]
})
export class ManageUsersComponent implements OnInit {
  users: User[] = []; // Initialize with an empty array
  newUser: { username: string; password: string } = { username: '', password: '' }; // Initialize with default values

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  addUser() {
    // Implement logic to add a new user
  }
  createUser() {
    this.userService.createUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = { username: '', password: '' };
    });
  }

  promoteUser(userId: string) {
    this.userService.promoteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }

  removeUser(userId: string) {
    this.userService.removeUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}


  
