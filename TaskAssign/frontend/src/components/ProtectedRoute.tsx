import { useAuthStore } from "@/store/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return <div>로딩 중...</div>; // or null
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
