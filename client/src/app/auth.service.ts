// client/src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { v4 as uuidv4 } from 'uuid'; // Use UUID for generating unique string IDs

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersKey = 'users'; // Local storage key for users
  private currentUserKey = 'currentUser'; // Local storage key for current logged-in user

  constructor() {
    if (this.isBrowser()) {
      this.ensureSuperUser(); // Ensure that there's a Super Admin in the system
    }
  }

  // Check if code is running in the browser context
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Authenticate user by matching username and password
  authenticate(username: string, password: string): boolean {
    if (!this.isBrowser()) return false; // Prevent access on non-browser platforms

    const users: User[] = this.getUsers();
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  // Register a new user (ensure username is unique)
  register(username: string, password: string, role: string = 'User'): boolean {
    if (!this.isBrowser()) return false;

    let users: User[] = this.getUsers();
    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      console.error('Username already exists.');
      return false;
    }

    const newUser: User = {
      id: this.generateUserId(),
      username: username,
      email: `${username}@chatapp.com`, // Simple email generation for demo purposes
      password: password,
      roles: [role], // Default role is 'User'
      groups: [],
    };

    users.push(newUser);
    this.setUsers(users);
    return true;
  }

  // Get all users from local storage
  getUsers(): User[] {
    if (!this.isBrowser()) return [];

    const usersJson = localStorage.getItem(this.usersKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  // Set users in local storage
  private setUsers(users: User[]): void {
    if (!this.isBrowser()) return;

    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  // Ensure there's a super admin if none exists
  ensureSuperUser(): void {
    if (!this.isBrowser()) return;

    const users = this.getUsers();
    if (!users.find((user) => user.roles.includes('Super Admin'))) {
      users.push({
        id: this.generateUserId(),
        username: 'super',
        email: 'super@admin.com',
        password: '123',
        roles: ['Super Admin'],
        groups: [],
      });
      this.setUsers(users);
    }
  }

  // Generate a unique user ID for new users (using UUID)
  private generateUserId(): string {
    return uuidv4(); // Generates a unique string ID
  }

  // Get the currently logged-in user from local storage
  getCurrentUser(): User | null {
    if (!this.isBrowser()) return null;

    const currentUserJson = localStorage.getItem(this.currentUserKey);
    return currentUserJson ? JSON.parse(currentUserJson) : null;
  }

  // Log out the current user by removing them from local storage
  logout(): void {
    if (!this.isBrowser()) return;

    localStorage.removeItem(this.currentUserKey);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;

    return localStorage.getItem(this.currentUserKey) !== null;
  }

  // Promote a user to Group Admin (Super Admin only)
  promoteToGroupAdmin(username: string): boolean {
    if (!this.isBrowser()) return false;

    const users = this.getUsers();
    const user = users.find((u) => u.username === username);

    if (user && !user.roles.includes('Group Admin')) {
      user.roles.push('Group Admin');
      this.setUsers(users);
      return true;
    }
    return false;
  }

  // Promote a user to Super Admin (Super Admin only)
  promoteToSuperAdmin(username: string): boolean {
    if (!this.isBrowser()) return false;

    const users = this.getUsers();
    const user = users.find((u) => u.username === username);

    if (user && !user.roles.includes('Super Admin')) {
      user.roles.push('Super Admin');
      this.setUsers(users);
      return true;
    }
    return false;
  }

  // Remove a user from the system (Super Admin only)
  removeUser(username: string): boolean {
    if (!this.isBrowser()) return false;

    let users = this.getUsers();
    const initialLength = users.length;
    users = users.filter((user) => user.username !== username);

    if (users.length < initialLength) {
      this.setUsers(users);
      return true;
    }
    return false;
  }
}
