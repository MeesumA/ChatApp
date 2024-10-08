import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: any;

  constructor() {
    this.socket = io('http://localhost:3000');  // Make sure the server is accessible
  }

  // Send message to the server
  sendMessage(message: string, user: string) {
    this.socket.emit('newMessage', { user, message });
  }

  // Listen for new messages from the server
  getMessages(callback: (data: any) => void) {
    this.socket.on('messageBroadcast', callback);
  }
}
