import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { GroupChannelService } from '../group-channel.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule], 
})
export class GroupsComponent {
  groupName: string = '';
  channelName: string = '';
  selectedGroup: string = '';
  username: string = '';  
  availableGroups: any[] = [];

  constructor(
    private groupChannelService: GroupChannelService,
    private authService: AuthService
  ) {
    this.availableGroups = this.groupChannelService.getGroups();
  }

  createGroup() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.groupChannelService.createGroup(this.groupName, currentUser.username);
      this.availableGroups = this.groupChannelService.getGroups();
    }
  }

  addChannel() {
    this.groupChannelService.addChannelToGroup(this.selectedGroup, this.channelName);
  }

  assignUser(username: string) {
    this.groupChannelService.assignUserToGroup(this.selectedGroup, username);
  }
}
