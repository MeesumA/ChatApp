import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Group } from './models/group.model'; 
import { User } from './models/user.model'; 

@Injectable({
  providedIn: 'root',
})
export class GroupChannelService {
  private groupsKey = 'groups';
  private interestRequestsKey = 'interestRequests'; // Key for storing group interest requests

  constructor(private authService: AuthService) {}

  // Get all groups from local storage
  getGroups(): Group[] {
    const groupsJson = localStorage.getItem(this.groupsKey);
    return groupsJson ? JSON.parse(groupsJson) : [];
  }

  // Save groups to local storage
  private setGroups(groups: Group[]): void {
    localStorage.setItem(this.groupsKey, JSON.stringify(groups));
  }

  // Allow users to join a channel in a group
  joinChannel(groupName: string, channelName: string): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const groups = this.getGroups();
      const group = groups.find((g: Group) => g.name === groupName);
      if (group) {
        const channel = group.channels.find((c: string) => c === channelName);
        if (channel && !currentUser.groups.includes(groupName)) {
          currentUser.groups.push(groupName);
          this.authService.updateCurrentUser(currentUser);
          console.log(`User joined the channel: ${channelName} in group: ${groupName}`);
        }
      }
    }
  }

  // Allow users to leave a group
  leaveChannel(groupName: string, channelName: string): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const groups = this.getGroups();
      const group = groups.find((g: Group) => g.name === groupName);
      if (group) {
        const channelIndex = group.channels.findIndex((c: string) => c === channelName);
        if (channelIndex !== -1) {
          group.channels.splice(channelIndex, 1);
          this.setGroups(groups);
          console.log(`User left the channel: ${channelName} in group: ${groupName}`);
        }
      }
    }
  }

  // Get channels for a specific user based on the groups they belong to
  getUserChannels(username: string): string[] {
    const groups = this.getUserGroups(username);
    const userChannels = groups.flatMap((group: Group) => group.channels);
    return Array.from(new Set(userChannels)); // Remove duplicates
  }

  // Get groups for a specific user (i.e., the groups they are part of)
  getUserGroups(username: string): Group[] {
    const groups = this.getGroups();
    return groups.filter((group: Group) => group.users.includes(username));
  }

  // Allow users to register interest in a group
  requestToJoinGroup(groupName: string): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      console.error('You must be logged in to request to join a group.');
      return;
    }

    const interestRequests = this.getInterestRequests();
    const existingRequest = interestRequests.find(
      (request: any) => request.username === currentUser.username && request.groupName === groupName
    );

    if (!existingRequest) {
      interestRequests.push({ username: currentUser.username, groupName });
      this.setInterestRequests(interestRequests);
      console.log(`User "${currentUser.username}" has requested to join the group "${groupName}".`);
    } else {
      console.error(`You have already requested to join the group "${groupName}".`);
    }
  }

  // Get interest requests
  getInterestRequests(): any[] {
    const requestsJson = localStorage.getItem(this.interestRequestsKey);
    return requestsJson ? JSON.parse(requestsJson) : [];
  }

  // Set interest requests in local storage
  private setInterestRequests(requests: any[]): void {
    localStorage.setItem(this.interestRequestsKey, JSON.stringify(requests));
  }

  // Clear interest request after it's handled
  clearInterestRequest(username: string, groupName: string): void {
    let interestRequests = this.getInterestRequests();
    interestRequests = interestRequests.filter(
      (request: any) => !(request.username === username && request.groupName === groupName)
    );
    this.setInterestRequests(interestRequests);
  }

  // Create a new group
  createGroup(groupName: string, adminUsername: string): void {
    const groups = this.getGroups();
    const newGroup: Group = { 
      name: groupName, 
      adminUsername, 
      channels: [], 
      users: [adminUsername] // Admin is added to the group as the first user
    };
    groups.push(newGroup);
    this.setGroups(groups);
    console.log('Groups after creation:', groups);
  }

  // Add a channel to a group
  addChannelToGroup(groupName: string, channelName: string): void {
    const groups = this.getGroups();
    const group = groups.find((g: Group) => g.name === groupName);

    if (group) {
      if (!group.channels.includes(channelName)) {
        group.channels.push(channelName);
        this.setGroups(groups);
        console.log(`Channel "${channelName}" added to group "${groupName}".`);
      } else {
        console.error(`Channel "${channelName}" already exists in group "${groupName}".`);
      }
    } else {
      console.error(`Group "${groupName}" not found.`);
    }
  }

  // Assign a user to a group
  assignUserToGroup(groupName: string, username: string): void {
    const groups = this.getGroups();
    const group = groups.find((g: Group) => g.name === groupName);

    if (group) {
      if (!group.users.includes(username)) {
        group.users.push(username);
        this.setGroups(groups);
        console.log(`User "${username}" assigned to group "${groupName}".`);
      } else {
        console.error(`User "${username}" is already a member of the group "${groupName}".`);
      }
    } else {
      console.error(`Group "${groupName}" not found.`);
    }
  }

  // Super Admin functions
  promoteToGroupAdmin(username: string): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.roles.includes('Super Admin')) {
      this.authService.promoteToGroupAdmin(username);
    } else {
      console.error('Permission denied: Only Super Admin can promote to Group Admin');
    }
  }

  promoteToSuperAdmin(username: string): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.roles.includes('Super Admin')) {
      this.authService.promoteToSuperAdmin(username);
    } else {
      console.error('Permission denied: Only Super Admin can promote to Super Admin');
    }
  }

  removeUser(username: string): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.roles.includes('Super Admin')) {
      this.authService.removeUser(username);
    } else {
      console.error('Permission denied: Only Super Admin can remove users');
    }
  }
}
