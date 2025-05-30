// src/store/auth.ts
import { create } from "zustand";
import type { User } from "@/types/auth";
import { api } from "@/lib/api"; // axios 인스턴스

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isInitialized: boolean;
  setAuth: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  isInitialized: false,

  // 로그인 성공 시 호출
  setAuth: (user, token, refreshToken) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    set({ user, token, refreshToken });
  },

  // 로그아웃 처리
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    set({ user: null, token: null });
  },

  // 앱 초기 로딩 시 호출
  initializeAuth: async () => {
    const auto = localStorage.getItem("autoLogin") === "true";
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    // 1. 기본 토큰 존재 시 유효성 확인
    if (user && token) {
      try {
        const res = await api.get("/users/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        set({
          user: res.data,
          token,
          refreshToken: localStorage.getItem("refreshToken"),
          isInitialized: true,
        });
        return;
      } catch (err) {
        console.warn("access token 만료 또는 유효하지 않음");

        // 자동 로그인 아니면 로그아웃 처리
        if (!auto) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          set({ user: null, token: null, refreshToken: null, isInitialized: true });
          return;
        }
      }
    }

    // ✅ 2. 자동 로그인 설정된 경우 refresh 시도
    if (auto) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const res = await api.post("/user/token/refresh/", { refresh: refreshToken });
          const newAccessToken = res.data.access;
          localStorage.setItem("token", newAccessToken);

          // 유저 정보 다시 가져오기
          const me = await api.get("/users/me/", {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          set({
            user: me.data,
            token: newAccessToken,
            refreshToken,
            isInitialized: true,
          });
          return;
        } catch (err) {
          console.error("자동 토큰 갱신 실패", err);
          // 실패 시 모든 정보 제거
          localStorage.clear();
          set({ user: null, token: null, refreshToken: null, isInitialized: true });
          return;
        }
      }
    }

    // ✅ 그 외 기본 처리
    set({ isInitialized: true });
  },
}));
