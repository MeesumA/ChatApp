import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;

  constructor(private http: HttpClient) {
    console.log('Establishing Socket.IO connection...');
    this.socket = io('http://localhost:3000');  // Connect to the backend server
  }

  // Fetch users from the backend (excluding the current user)
  getUsers(currentUsername: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/users?username=${currentUsername}`);
  }
  

  // Send message to the server
  sendMessage(message: { sender: string, recipient: string, messageContent: string }) {
    console.log('Emitting message to server:', message);
    this.socket.emit('sendMessage', message);
  }

  // Receive messages from the server
  receiveMessage(): Observable<{ sender: string, messageContent: string }> {
    console.log('Setting up listener for incoming messages...');
    return new Observable(observer => {
      this.socket.on('receiveMessage', (data: { sender: string, messageContent: string }) => {
        console.log('Message received from server:', data);
        observer.next(data);
      });
    });
  }

  // Inform the server about user login
  login(username: string) {
    console.log(`${username} logging into socket...`);
    this.socket.emit('login', username);
  }
}
