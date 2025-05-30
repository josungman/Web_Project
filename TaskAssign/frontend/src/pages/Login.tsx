import { useAuthStore } from "@/store/auth";
import { LoginForm } from "@/components/LoginForm";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  // 초기화 안 되었으면 아무것도 안 보여줌
  if (!isInitialized) return null;

  // 로그인 상태라면 대시보드로 이동
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {/* 상단 이미지 */}
      <img
        src="/logo.png" // 퍼블릭 폴더의 이미지 경로
        alt="로고"
        className="w-32 h-32 mb-6"
      />

      {/* 로그인 폼 */}
      <LoginForm />
    </div>
  );
}
