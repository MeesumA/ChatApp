// src/app/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInKey = 'isLoggedIn';

  constructor() {}

  isLoggedIn(): boolean {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.isLoggedInKey) === 'true';
    }
    return false;
  }

  login(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.isLoggedInKey, 'true');
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.isLoggedInKey);
    }
  }
}
