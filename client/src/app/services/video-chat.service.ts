import { Injectable } from '@angular/core';
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root',
})
export class VideoChatService {
  peer: Peer;

  constructor() {
    this.peer = new Peer();
  }

  callUser(peerId: string, stream: MediaStream) {
    const call = this.peer.call(peerId, stream);
    call.on('stream', (_remoteStream) => {
      // Display remote video stream
    });
  }

  answerCall(stream: MediaStream) {
    this.peer.on('call', (call) => {
      call.answer(stream);
      call.on('stream', (remoteStream) => {
        // Display remote video stream
      });
    });
  }
}
