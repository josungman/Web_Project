// src/pages/RootRedirect.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

export default function RootRedirect() {
  const user = useAuthStore((state) => state.user);

  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
}
