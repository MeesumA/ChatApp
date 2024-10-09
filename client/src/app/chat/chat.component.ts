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
  currentUser: any;  // The current logged-in user
  users: { username: string }[] = [];  // All available users except the current one
  selectedRecipient: string = '';  // Username of the selected recipient
  message: string = '';  // Message content
  messages: { sender: string, messageContent: string }[] = [];  // Chat messages

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit(): void {
    // Get the current user from the AuthService
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current user logged in:', this.currentUser);

    // Fetch all users except the current one
    this.chatService.getUsers(this.currentUser.username).subscribe(
      (users) => {
        console.log('Fetched users:', users);
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
    

    // Listen for incoming messages
    this.chatService.receiveMessage().subscribe((data) => {
      console.log('Incoming message:', data);
      if (data.sender === this.selectedRecipient) {
        this.messages.push(data);  // Show only messages from the selected recipient
      }
    });

    // Inform the server about user login
    this.chatService.login(this.currentUser.username);
    console.log(`${this.currentUser.username} has logged in`);
  }

  // Start chatting with the selected user
  startChat(recipient: string) {
    console.log(`Starting chat with ${recipient}`);
    this.selectedRecipient = recipient;
    this.messages = [];  // Clear previous messages
  }

  // Send message to the selected recipient
  sendMessage() {
    if (this.message.trim() && this.selectedRecipient) {
      console.log(`Sending message to ${this.selectedRecipient}:`, this.message);
      this.chatService.sendMessage({
        sender: this.currentUser.username,
        recipient: this.selectedRecipient,
        messageContent: this.message,
      });

      // Show the message in the sender's chat window
      this.messages.push({ sender: 'You', messageContent: this.message });
      this.message = '';  // Clear the input field
    } else {
      console.warn('Message or recipient is missing.');
    }
  }
}
