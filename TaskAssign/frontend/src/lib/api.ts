import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // 공통 주소
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
