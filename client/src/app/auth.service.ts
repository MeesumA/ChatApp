import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersKey = 'users';
  private isLoggedInKey = 'isLoggedIn';
  private currentUserKey = 'currentUser';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  register(username: string, password: string, role: string): void {
    const users = this.getUsers();
    const newUser = { username, password, role, groups: [], channels: [] };
    users.push(newUser);
    this.setUsers(users);
  }

  authenticate(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find((u: { username: string; password: string }) => 
      u.username === username && u.password === password
    );
    if (user) {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.isLoggedInKey, 'true');
        localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      }
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.isLoggedInKey) === 'true';
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.isLoggedInKey);
      localStorage.removeItem(this.currentUserKey);
    }
  }

  getCurrentUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem(this.currentUserKey);
      return userJson ? JSON.parse(userJson) : null;
    }
    return null;
  }

  private getUsers() {
    if (isPlatformBrowser(this.platformId)) {
      const usersJson = localStorage.getItem(this.usersKey);
      return usersJson ? JSON.parse(usersJson) : [];
    }
    return [];
  }

  private setUsers(users: any[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    }
  }
}
