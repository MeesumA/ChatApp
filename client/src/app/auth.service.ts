import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersKey = 'users'; // Local storage key for users
  private currentUserKey = 'currentUser'; // Local storage key for current logged-in user
  private tokenKey = 'token';  // Local storage key for token

  constructor() {
    if (this.isBrowser()) {
      this.ensureSuperUser(); // Ensure there's a Super Admin
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Authenticate user and generate a token
  authenticate(username: string, password: string): boolean {
    if (!this.isBrowser()) return false;
    const users: User[] = this.getUsers();
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      localStorage.setItem(this.tokenKey, 'mockToken123');  // Store mock token
      return true;
    }
    return false;
  }

  // Register a new user
  register(username: string, password: string, role: string = 'User'): boolean {
    if (!this.isBrowser()) return false;
    let users: User[] = this.getUsers();
    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      console.error('Username already exists.');
      return false;
    }

    const newUser: User = {
      id: uuidv4(),
      username: username,
      email: `${username}@chatapp.com`,
      password: password,
      roles: [role],
      groups: [],
    };

    users.push(newUser);
    this.setUsers(users);
    return true;
  }

  // Get all users from localStorage
  getUsers(): User[] {
    if (!this.isBrowser()) return [];
    const usersJson = localStorage.getItem(this.usersKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private setUsers(users: User[]): void {
    if (!this.isBrowser()) return;
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  // Ensure at least one Super Admin exists
  ensureSuperUser(): void {
    if (!this.isBrowser()) return;
    const users = this.getUsers();
    if (!users.find((user) => user.roles.includes('Super Admin'))) {
      users.push({
        id: uuidv4(),
        username: 'super',
        email: 'super@admin.com',
        password: '123',
        roles: ['Super Admin'],
        groups: [],
      });
      this.setUsers(users);
    }
  }

  // Get the currently logged-in user
  getCurrentUser(): User | null {
    if (!this.isBrowser()) return null;
    const currentUserJson = localStorage.getItem(this.currentUserKey);
    return currentUserJson ? JSON.parse(currentUserJson) : null;
  }

  // Update the current user details
  updateCurrentUser(user: User): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  // Check if the user is logged in by checking the token
  isLoggedIn(): boolean {
    return this.isBrowser() ? !!localStorage.getItem(this.tokenKey) : false;
  }

  // Logout the current user
  logout(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(this.currentUserKey);
    localStorage.removeItem(this.tokenKey);  // Clear the token on logout
  }

  // Promote a user to Group Admin
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

  // Promote a user to Super Admin
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

  // Remove a user by username
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

  // Delete the current user's account
  deleteAccount(): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.removeUser(currentUser.username);
      this.logout();
    }
  }
}
