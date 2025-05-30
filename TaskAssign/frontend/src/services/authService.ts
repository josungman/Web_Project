// src/services/authService.ts
import { api } from "@/lib/api"; // axios 인스턴스
import type { LoginResponse } from "@/types/auth";

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await api.post("/users/login/", { email, password });
  const { access, refresh } = res.data;

  // /users/me/로 유저 정보 가져오기
  const me = await api.get("/users/me/", {
    headers: { Authorization: `Bearer ${access}` },
  });

  return {
    token: access,
    refreshToken: refresh,
    user: me.data,
  };
}

export async function getMe() {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token");

  const response = await api.get("/users/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
