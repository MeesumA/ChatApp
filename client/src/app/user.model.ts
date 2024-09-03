export interface User {
    id: string;
    username: string;
    password: string;  // You may not need to include password in the frontend
    role: 'User' | 'GroupAdmin' | 'SuperAdmin';
  }