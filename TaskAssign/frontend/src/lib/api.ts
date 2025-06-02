import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 인터셉터 추가(요청) + 로그
api.interceptors.request.use(
  (config) => {
    console.log(`[REQ] ${config.method?.toUpperCase()} ${config.url}`, config.data || {});
    return config;
  },
  (error) => {
    console.error("[REQ ERROR]", error);
    return Promise.reject(error);
  }
);

// ✅ 인터셉터 추가(응답) + 로그
api.interceptors.response.use(
  (res) => {
    console.log(`[RES] ${res.config.method?.toUpperCase()} ${res.config.url}`, res.data);
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    // 자동 토큰 갱신 처리
    if (error.response?.status === 401 && !originalRequest._retry && localStorage.getItem("autoLogin") === "true") {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refreshToken");
        console.warn("[TOKEN] Refresh 요청 시도");

        const response = await api.post("/users/token/refresh/", { refresh });
        const newToken = response.data.access;

        localStorage.setItem("token", newToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("[TOKEN] 자동 갱신 실패", err);
      }
    }

    console.error(`[RES ERROR] ${originalRequest?.url}`, error?.response?.data || error);
    return Promise.reject(error);
  }
);
