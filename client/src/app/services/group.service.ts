import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  createGroup(name: string, adminUsername: string) {
    return this.http.post('/api/groups', { name, adminUsername });
  }

  joinGroup(groupId: string, userId: string) {
    return this.http.post(`/api/groups/${groupId}/join`, { userId });
  }

  createChannel(groupId: string, name: string) {
    return this.http.post(`/api/groups/${groupId}/channels`, { name });
  }
}
