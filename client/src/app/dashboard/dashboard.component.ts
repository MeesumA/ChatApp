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
  userChannels: any[] = [];
  currentUser: any = null;

  constructor(
    private groupChannelService: GroupChannelService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.userGroups = this.groupChannelService.getUserGroups(this.currentUser.username);
      this.userChannels = this.groupChannelService.getUserChannels(this.currentUser.username);
    }
  }
}
