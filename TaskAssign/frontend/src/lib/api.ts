import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 인터셉터 추가
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry && localStorage.getItem("autoLogin") === "true") {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refreshToken");
        const response = await api.post("/users/token/refresh/", { refresh });
        const newToken = response.data.access;

        localStorage.setItem("token", newToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("자동 토큰 갱신 실패", err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
