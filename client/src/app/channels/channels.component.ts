import { Component, OnInit } from '@angular/core';
import { GroupChannelService } from '../group-channel.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  userChannels: string[] = [];

  constructor(
    private groupChannelService: GroupChannelService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userChannels = this.groupChannelService.getUserChannels(currentUser.username);
    }
  }

  leaveChannel(channel: string) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.groupChannelService.leaveChannel(currentUser.username, channel);
      this.userChannels = this.userChannels.filter(c => c !== channel);
    }
  }
}
