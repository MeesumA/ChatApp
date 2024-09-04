import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.authService.deleteAccount();
    }
  }
}
