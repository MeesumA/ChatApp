import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],  // Add CommonModule here for *ngFor support
})
export class ChatComponent {
  message: string = '';
  messages: { user: string, message: string }[] = [];
  currentUser: string = 'John Doe';  // Example user

  constructor() {}

  sendMessage() {
    if (this.message.trim()) {
      // Logic to send message
      this.messages.push({ user: this.currentUser, message: this.message });
      this.message = '';  // Clear the message
    }
  }
}
