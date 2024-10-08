// chat.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Add CommonModule here for *ngFor support
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: { sender: string, messageContent: string }[] = [];
  currentUser: any;
  selectedRecipient: string = '';  // Stores the selected recipient (username)
  users: { username: string }[] = [];  // List of users to choose from (with `username` property)

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    // Load all users except the current user
    this.chatService.getUsers().subscribe((users: { username: string }[]) => {
      this.users = users.filter(u => u.username !== this.currentUser.username);
    });

    // Listen for incoming messages
    this.chatService.receiveMessage().subscribe((data: { sender: string, messageContent: string }) => {
      this.messages.push({ sender: data.sender, messageContent: data.messageContent });
    });

    // Inform the server about user login
    this.chatService.login(this.currentUser.username);
  }

  sendMessage() {
    if (this.message.trim() && this.selectedRecipient) {
      // Send the message to the selected recipient
      this.chatService.sendMessage({
        sender: this.currentUser.username,
        recipient: this.selectedRecipient,
        messageContent: this.message
      });

      // Display the message in the sender's chat window
      this.messages.push({ sender: 'You', messageContent: this.message });
      this.message = '';  // Clear input field
    }
  }
}
