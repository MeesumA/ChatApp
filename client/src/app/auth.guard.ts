import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    console.log('Checking if user is logged in.');
    if (this.authService.isLoggedIn()) {
      console.log('User is logged in.');
      return true;
    } else {
      console.log('User not logged in, redirecting to login.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
