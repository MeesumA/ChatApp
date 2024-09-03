// src/app/manage-user.component.ts
import { Component, OnInit } from '@angular/core';
// import { UserService } from '../user.service'; // Ensure the correct path
// import { User } from '../user.model'; // Import the User model or interface
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css'],
  imports: [FormsModule, CommonModule],
  providers: [AuthService]
})

export class MessagingComponent {
  messageContent: string = '';
  messages: { content: string; from: string }[] = []; // Define messages array

  sendMessage() {
    // Implement logic to send a message
    // For now, you can push a mock message to test the UI
    this.messages.push({
      content: this.messageContent,
      from: 'Me' // Replace with actual sender
    });
    this.messageContent = ''; // Clear the input field
  }
}
