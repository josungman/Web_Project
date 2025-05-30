// src/types/auth.ts (새로 만들기)

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}
