import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { fromEvent, Observable } from 'rxjs';  // <-- Import fromEvent and Observable

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket = io('http://localhost:3000');

  constructor(private http: HttpClient) {}

  joinChannel(channelId: string) {
    this.socket.emit('joinChannel', channelId);
  }

  sendMessage(message: any) {
    this.socket.emit('sendMessage', message);
  }

  // Use RxJS's fromEvent to listen to messages
  receiveMessages(): Observable<any> {
    return fromEvent(this.socket, 'receiveMessage');  // <-- Use fromEvent to create an observable
  }

  uploadImage(formData: FormData) {
    return this.http.post('/api/upload-image', formData);
  }
}
