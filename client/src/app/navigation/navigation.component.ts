import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isLoggedIn = false;
  roles: string[] = []; 
  isSuperAdmin = false; 
  isGroupAdmin = false; 

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser && currentUser.roles.length > 0) {
      this.roles = currentUser.roles; // 
      
      
      this.isSuperAdmin = this.roles.includes('Super Admin');
      this.isGroupAdmin = this.roles.includes('Group Admin');
    }
  }

  // Logout function
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
