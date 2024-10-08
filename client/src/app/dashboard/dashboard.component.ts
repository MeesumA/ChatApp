import { Component, OnInit } from '@angular/core';
import { GroupChannelService } from '../group-channel.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userGroups: any[] = [];
  currentUser: any = null;

  constructor(
    private groupChannelService: GroupChannelService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.userGroups = this.currentUser.groups || []; // Fallback to an empty array
      // this.userChannels = this.currentUser.channels || []; // Make sure channels is also assigned
    }
  }
  
  }
