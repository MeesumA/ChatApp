import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ChatComponent implements OnInit {
  currentUser: any;
  users: { username: string }[] = [];  // All available users
  searchQuery: string = '';  // Search query for filtering users
  selectedRecipient: string = '';  // Username of the selected recipient
  message: string = '';  // Message content
  messages: { sender: string, messageContent: string }[] = [];  // Chat messages

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit(): void {
    // Get the current user from the AuthService
    this.currentUser = this.authService.getCurrentUser();

    // Fetch all users except the current one
    this.chatService.getUsers(this.currentUser.username).subscribe((users) => {
      this.users = users;
    });

    // Listen for incoming messages
    this.chatService.receiveMessage().subscribe((data) => {
      if (data.sender === this.selectedRecipient) {
        this.messages.push(data);  // Show only messages from the selected recipient
      }
    });

    // Inform the server about user login
    this.chatService.login(this.currentUser.username);
  }

  // Filter users based on the search query
  filteredUsers() {
    return this.users.filter((user) =>
      user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Start chatting with the selected user
  startChat(recipient: string) {
    this.selectedRecipient = recipient;
    this.messages = [];  // Clear previous messages
  }

  // Send message to the selected recipient
  sendMessage() {
    if (this.message.trim() && this.selectedRecipient) {
      this.chatService.sendMessage({
        sender: this.currentUser.username,
        recipient: this.selectedRecipient,
        messageContent: this.message,
      });

      // Show the message in the sender's chat window
      this.messages.push({ sender: 'You', messageContent: this.message });
      this.message = '';  // Clear the input
    }
  }
}
