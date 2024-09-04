// client/src/app/group-channel.service.ts

import { Injectable } from '@angular/core';
import { Group } from './models/group.model'; // Assuming you have a Group model
import { User } from './models/user.model'; // Assuming you have a User model

@Injectable({
  providedIn: 'root',
})
export class GroupChannelService {
  private groupsKey = 'groups'; // Key for local storage

  constructor() {}

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

  // Get all groups from local storage
  getGroups(): Group[] {
    const groupsJson = localStorage.getItem(this.groupsKey);
    return groupsJson ? JSON.parse(groupsJson) : [];
  }

  // Save groups to local storage
  private setGroups(groups: Group[]): void {
    localStorage.setItem(this.groupsKey, JSON.stringify(groups));
  }

  // Get groups for a specific user (i.e., the groups they are part of)
  getUserGroups(username: string): Group[] {
    const groups = this.getGroups();
    return groups.filter((group) => group.users.includes(username));
  }

  // Get channels for a specific user (based on the groups they belong to)
  getUserChannels(username: string): string[] {
    const groups = this.getUserGroups(username);
    const userChannels = groups.flatMap((group) => group.channels);
    return Array.from(new Set(userChannels)); // Remove duplicates
  }
}
