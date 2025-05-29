// src/store/auth.ts
import { create } from "zustand";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isInitialized: boolean; // ✅ 추가
  setUser: (user: User, token: string) => void;
  logout: () => void;
  initializeAuth: () => void; // 추가
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isInitialized: false,
  setUser: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
  initializeAuth: () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      set({ user: JSON.parse(user), token, isInitialized: true });
    } else {
      set({ isInitialized: true }); // ❗ 초기화 완료는 보장
    }
  },
}));
