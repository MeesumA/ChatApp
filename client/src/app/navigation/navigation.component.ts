import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isLoggedIn = false; // Update this based on actual login status

  constructor(private router: Router) {
    // Assume some logic to determine if the user is logged in
    // For example:
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  logout() {
    // Clear authentication token or session
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
