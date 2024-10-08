import { Injectable } from '@angular/core';
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root'
})
export class VideoChatService {
  peer: Peer;

  constructor() {
    this.peer = new Peer();
  }

  createCall(peerId: string, stream: MediaStream) {
    const call = this.peer.call(peerId, stream);
    return call;
  }

  answerCall(stream: MediaStream) {
    this.peer.on('call', (call) => {
      call.answer(stream); // Answer the call with our media stream
      call.on('stream', (remoteStream) => {
        // Display remoteStream
      });
    });
  }
}
