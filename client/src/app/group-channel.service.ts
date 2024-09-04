import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Group } from './models/group.model'; 
import { User } from './models/user.model'; 

@Injectable({
    providedIn: 'root',
  })
  export class GroupChannelService {
    private groupsKey = 'groups';
  
    constructor(private authService: AuthService) {}
    joinChannel(groupName: string, channelName: string): void {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          const groups = this.getGroups();
          const group = groups.find((g) => g.name === groupName);
          if (group) {
            const channel = group.channels.find((c) => c === channelName);
            if (channel && !currentUser.groups.includes(groupName)) {
              currentUser.groups.push(groupName);
              this.authService.updateCurrentUser(currentUser);
              console.log(`User joined the channel: ${channelName} in group: ${groupName}`);
            }
          }
        }
      }
      
      leaveGroup(groupName: string): void {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          currentUser.groups = currentUser.groups.filter((group) => group !== groupName);
          this.authService.updateCurrentUser(currentUser);
          console.log(`User left the group: ${groupName}`);
        }
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
    const group = groups.find((g) => g.name === groupName);

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
    const group = groups.find((g) => g.name === groupName);

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

  deleteAccount(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.authService.removeUser(currentUser.username);
      this.authService.logout();
      console.log('User account deleted');
    }
  }

  // Get all groups from local storage
  getGroups(): Group[] {
    const groupsJson = localStorage.getItem(this.groupsKey);
    return groupsJson ? JSON.parse(groupsJson) : [];
  }

  // Save groups to local storage
  private setGroups(groups: Group[]): void {
    localStorage.setItem(this.groupsKey, JSON.stringify(groups));
  }

  // Get groups for a specific user 
  getUserGroups(username: string): Group[] {
    const groups = this.getGroups();
    return groups.filter((group) => group.users.includes(username));
  }

  // Get channels for a specific user 
  getUserChannels(username: string): string[] {
    const groups = this.getUserGroups(username);
    const userChannels = groups.flatMap((group) => group.channels);
    return Array.from(new Set(userChannels)); // Remove duplicates
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

