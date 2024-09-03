import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model'; // Import User model

@Injectable({
  providedIn: 'root'
})

export class UserService {
    private apiUrl = 'http://localhost:3000/users'; // Replace with your API URL

    constructor(private http: HttpClient) {}
  
    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.apiUrl);
    }
  }

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
