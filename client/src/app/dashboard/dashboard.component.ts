import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common';  // Import CommonModule
import { GroupChannelService } from '../group-channel.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],  // Add FormsModule and CommonModule here
})
export class DashboardComponent {
  selectedGroup: any = null;  // Store the entire group object here
  selectedChannel: string = '';
  availableGroups: any[] = [];

  constructor(
    private groupChannelService: GroupChannelService,
    private authService: AuthService
  ) {
    this.loadGroups();
  }

  loadGroups() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.availableGroups = this.groupChannelService.getGroups().filter(group =>
        group.users.includes(currentUser.username)
      );
    }
  }

  onGroupSelect(groupName: string) {
    this.selectedGroup = this.availableGroups.find(group => group.name === groupName);  // Find and set the group object
  }

  onChannelSelect(channel: string) {
    this.selectedChannel = channel;
  }
}
