// client/src/app/groups/groups.component.ts

import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { Component } from '@angular/core';
import { GroupChannelService } from '../group-channel.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class GroupsComponent {
  groupName: string = '';
  channelName: string = '';
  selectedGroup: string = '';
  username: string = '';
  availableGroups: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private groupChannelService: GroupChannelService,
    private authService: AuthService
  ) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.isAdmin = currentUser.roles.includes('Group Admin') || currentUser.roles.includes('Super Admin');
      this.availableGroups = this.groupChannelService.getGroups();
    }
  }

  createGroup() {
    if (!this.isAdmin) {
      console.error('Permission denied: Only Group Admins and Super Admins can create groups.');
      return;
    }

    if (!this.groupName.trim()) {
      console.error('Group name cannot be empty.');
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.groupChannelService.createGroup(this.groupName, currentUser.username);
      this.availableGroups = this.groupChannelService.getGroups();
      this.groupName = ''; // Reset input field
    }
  }

  addChannel() {
    if (!this.isAdmin) {
      console.error('Permission denied: Only Group Admins and Super Admins can add channels.');
      return;
    }

    if (!this.selectedGroup) {
      console.error('Please select a group.');
      return;
    }
    if (!this.channelName.trim()) {
      console.error('Channel name cannot be empty.');
      return;
    }

    this.groupChannelService.addChannelToGroup(this.selectedGroup, this.channelName);
    this.channelName = ''; // Reset input field
  }

  assignUser() {
    if (!this.isAdmin) {
      console.error('Permission denied: Only Group Admins and Super Admins can assign users.');
      return;
    }

    if (!this.selectedGroup) {
      console.error('Please select a group.');
      return;
    }
    if (!this.username.trim()) {
      console.error('Username cannot be empty.');
      return;
    }

    this.groupChannelService.assignUserToGroup(this.selectedGroup, this.username);
    this.username = ''; // Reset input field
  }
}
