import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { v4 as uuidv4 } from 'uuid';

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

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  authenticate(username: string, password: string): boolean {
    if (!this.isBrowser()) return false;
    const users: User[] = this.getUsers();
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

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

  getUsers(): User[] {
    if (!this.isBrowser()) return [];
    const usersJson = localStorage.getItem(this.usersKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private setUsers(users: User[]): void {
    if (!this.isBrowser()) return;
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

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

  getCurrentUser(): User | null {
    if (!this.isBrowser()) return null;
    const currentUserJson = localStorage.getItem(this.currentUserKey);
    return currentUserJson ? JSON.parse(currentUserJson) : null;
  }

  updateCurrentUser(user: User): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  logout(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(this.currentUserKey);
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

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

  deleteAccount(): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.removeUser(currentUser.username);
      this.logout();
    }
  }
}
