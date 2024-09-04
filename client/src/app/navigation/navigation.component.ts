import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isLoggedIn = false;
  role: string = '';

// client/src/app/navigation/navigation.component.ts

constructor(private authService: AuthService, private router: Router) {
  this.isLoggedIn = this.authService.isLoggedIn();
  const currentUser = this.authService.getCurrentUser();
  if (currentUser && currentUser.roles.length > 0) {
    this.role = currentUser.roles[0];  // Assuming the first role is the primary role
  }
}


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
