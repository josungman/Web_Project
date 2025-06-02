import { useAuthStore } from "@/store/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAuthStore((state) => state.token);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-sm text-gray-400">로딩 중...</span>
      </div>
    );
  }

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
