import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// client/src/app/auth.service.ts

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersKey = 'users';
  private isLoggedInKey = 'isLoggedIn';
  private currentUserKey = 'currentUser';

  constructor() {
    // Add a default super user if it doesn't exist, but only in browser context
    if (this.isBrowser()) {
      this.ensureSuperUser();
    }
  }

  // Check if localStorage is available (i.e., we are running in the browser)
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Register a new user
  register(username: string, password: string, role: string): void {
    if (this.isBrowser()) {
      const users = this.getUsers();
      const newUser = { username, password, role, groups: [], channels: [] };
      users.push(newUser);
      this.setUsers(users);
    }
  }

  // Authenticate a user
  authenticate(username: string, password: string): boolean {
    if (this.isBrowser()) {
      const users = this.getUsers();
      const user = users.find((u: { username: string; password: string }) => 
        u.username === username && u.password === password
      );
      if (user) {
        localStorage.setItem(this.isLoggedInKey, 'true');
        localStorage.setItem(this.currentUserKey, JSON.stringify(user));
        return true;
      }
    }
    return false;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return localStorage.getItem(this.isLoggedInKey) === 'true';
    }
    return false;
  }

  // Logout the user
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.isLoggedInKey);
      localStorage.removeItem(this.currentUserKey);
    }
  }

  // Get the current logged-in user
  getCurrentUser() {
    if (this.isBrowser()) {
      const userJson = localStorage.getItem(this.currentUserKey);
      return userJson ? JSON.parse(userJson) : null;
    }
    return null;
  }

  // Ensure super user exists
  private ensureSuperUser(): void {
    const users = this.getUsers();
    const superUserExists = users.some((user: any) => user.username === 'super');
    if (!superUserExists) {
      users.push({ username: 'super', password: '123', role: 'Super Admin', groups: [], channels: [] });
      this.setUsers(users);
    }
  }

  // Helper methods for localStorage management
  private getUsers() {
    if (this.isBrowser()) {
      const usersJson = localStorage.getItem(this.usersKey);
      return usersJson ? JSON.parse(usersJson) : [];
    }
    return [];
  }

  private setUsers(users: any[]) {
    if (this.isBrowser()) {
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    }
  }
}
