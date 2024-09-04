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
  assignedGroups: any[] = [];  // For regular users
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;
  groupInterest: string = '';  // Added this property to store group interest input
  interestRequests: any[] = [];  // Holds group interest requests for admins

  constructor(
    private groupChannelService: GroupChannelService,
    private authService: AuthService
  ) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.isAdmin = currentUser.roles.includes('Group Admin');
      this.isSuperAdmin = currentUser.roles.includes('Super Admin');
      
      if (this.isAdmin || this.isSuperAdmin) {
        this.availableGroups = this.groupChannelService.getGroups();  // Get all groups for admins
        this.interestRequests = this.groupChannelService.getInterestRequests();  // Get interest requests for admins
      } else {
        this.assignedGroups = this.groupChannelService.getUserGroups(currentUser.username);  // Get assigned groups for regular users
      }
    }
  }

  createGroup() {
    const currentUser = this.authService.getCurrentUser();
    if (!this.isAdmin && !this.isSuperAdmin) {
      console.error('Permission denied: Only Group Admins and Super Admins can create groups.');
      return;
    }
    if (!this.groupName.trim()) {
      console.error('Group name cannot be empty.');
      return;
    }
    this.groupChannelService.createGroup(this.groupName, currentUser!.username);
    this.availableGroups = this.groupChannelService.getGroups();  // Refresh groups list
    this.groupName = '';
  }

  addChannel() {
    if (!this.isAdmin && !this.isSuperAdmin) {
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
    this.channelName = ''; // Reset the input field
  }

  assignUser() {
    if (!this.isAdmin && !this.isSuperAdmin) {
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
    this.username = ''; // Reset the input field
  }

  // Register interest for a regular user
  registerInterest() {
    if (!this.groupInterest.trim()) {
      console.error('Group name cannot be empty.');
      return;
    }
    this.groupChannelService.requestToJoinGroup(this.groupInterest);
    this.groupInterest = '';  // Clear the input field after registration
  }

  // Approve group interest requests
  approveRequest(request: any) {
    this.groupChannelService.assignUserToGroup(request.groupName, request.username);
    this.groupChannelService.clearInterestRequest(request.username, request.groupName);
    this.interestRequests = this.groupChannelService.getInterestRequests(); // Refresh the list
  }

  // Reject group interest requests
  rejectRequest(request: any) {
    this.groupChannelService.clearInterestRequest(request.username, request.groupName);
    this.interestRequests = this.groupChannelService.getInterestRequests(); // Refresh the list
  }
}
