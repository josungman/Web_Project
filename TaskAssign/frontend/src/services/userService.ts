// src/services/userService.ts
import { api } from "@/lib/api";

export async function getUsers() {
  const response = await api.get("/users");
  return response.data;
}
