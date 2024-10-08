import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;

  constructor() {
    this.socket = io('http://localhost:3000');  // Your server URL
  }

  // Inform the server about user login
  login(username: string) {
    this.socket.emit('userLogin', username);
  }

  // Send message to server
  sendMessage(messageData: { sender: string, recipient: string, messageContent: string }) {
    this.socket.emit('sendMessage', messageData);
  }

// chat.service.ts

receiveMessage(): Observable<{ sender: string; messageContent: string }> {
    return new Observable(observer => {
      this.socket.on('receiveMessage', (data: { sender: string; messageContent: string }) => {
        observer.next(data);
      });
    });
  }
  

// chat.service.ts

getUsers(): Observable<any[]> {
    return new Observable(observer => {
      // Simulate fetching users with objects containing `username`
      const users = [
        { username: 'John' },
        { username: 'Marry' },
        { username: 'Alice' }
      ];
      observer.next(users);
    });
  }
}