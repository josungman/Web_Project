// src/types/auth.ts (새로 만들기)

export interface User {
  id: number;
  name: string;
  email: string;
  photo?: string; // ✅ 프로필 사진 URL (옵션이면 ? 붙이기)
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  photo?: File;
}

export interface SignupResponse {
  id: number;
  username: string;
  email: string;
}
