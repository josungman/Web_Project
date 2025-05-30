import { useAuthStore } from "@/store/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAuthStore((state) => state.token);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  if (!isInitialized) {
    // ✅ 초기화 전에는 아무것도 렌더링하지 않음
    return <div className="w-screen h-screen bg-white" />;
  }

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
