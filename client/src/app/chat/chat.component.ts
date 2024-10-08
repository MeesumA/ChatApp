import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,  // If you're using standalone components
  imports: [CommonModule, FormsModule]  // Import CommonModule and FormsModule
})
export class ChatComponent implements OnInit {
  message = '';
  messages: any[] = [];
  selectedChannel = 'default-channel'; 
  imageFile: File | null = null;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.joinChannel(this.selectedChannel);
    this.chatService.receiveMessages().subscribe((message: any) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    const message = { content: this.message, channelId: this.selectedChannel };
    this.chatService.sendMessage(message);
    this.message = ''; 
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
    }
  }

  uploadImage(): void {
    if (this.imageFile) {
      const formData = new FormData();
      formData.append('image', this.imageFile);

      this.chatService.uploadImage(formData).subscribe((response: any) => {
        const message = {
          content: '',
          imageUrl: response.imageUrl,
          channelId: this.selectedChannel
        };
        this.chatService.sendMessage(message);
      });
    }
  }
}
