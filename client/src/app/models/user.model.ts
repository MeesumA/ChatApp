// client/src/app/models/user.model.ts

export interface User {
    username: string;
    email: string;
    id: string;
    password: string;
    roles: string[]; // e.g., ['User'], ['Group Admin'], ['Super Admin']
    groups: string[]; // Groups that the user is part of
  }
  