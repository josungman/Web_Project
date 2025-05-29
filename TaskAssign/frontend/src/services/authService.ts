// src/services/authService.ts

const dummyUser = {
  id: 1,
  email: "test@test.com",
  password: "123456",
  name: "테스트 유저",
};

import type { LoginResponse } from "@/types/auth";

export async function login(email: string, password: string): Promise<LoginResponse> {
  console.log("📡 로그인 호출됨", email, password);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === dummyUser.email && password === dummyUser.password) {
        resolve({
          accessToken: "dummy-token-123456",
          user: {
            id: dummyUser.id,
            name: dummyUser.name,
            email: dummyUser.email,
          },
        });
      } else {
        reject(new Error("이메일 또는 비밀번호가 일치하지 않습니다."));
      }
    }, 500); // 가짜 딜레이
  });
}
