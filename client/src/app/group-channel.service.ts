import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GroupChannelService {
  private groupsKey = 'groups';

  constructor() {}

  // Create a new group
  createGroup(name: string, adminUsername: string): void {
    const groups = this.getGroups();
    const newGroup = { name, adminUsername, channels: [], users: [] };
    groups.push(newGroup);
    this.setGroups(groups);
  }

  // Add a channel to a group
  addChannelToGroup(groupName: string, channelName: string): void {
    const groups = this.getGroups();
    const group = groups.find((g) => g.name === groupName);
    if (group) {
      group.channels.push({ name: channelName });
      this.setGroups(groups);
    }
  }

  // Assign user to group
  assignUserToGroup(groupName: string, username: string): void {
    const groups = this.getGroups();
    const group = groups.find((g) => g.name === groupName);
    if (group && !group.users.includes(username)) {
      group.users.push(username);
      this.setGroups(groups);
    }
  }

  // Get all groups
  getGroups(): any[] {
    const groupsJson = localStorage.getItem(this.groupsKey);
    return groupsJson ? JSON.parse(groupsJson) : [];
  }

  private setGroups(groups: any[]) {
    localStorage.setItem(this.groupsKey, JSON.stringify(groups));
  }
}
