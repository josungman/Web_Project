import PageTransition from "@/components/PageTransition";
import { useAuthStore } from "@/store/auth";
import { LoginForm } from "@/components/LoginForm";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  // 초기화 안 되었으면 아무것도 안 보여줌
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-sm text-gray-400">로딩 중...</span>
      </div>
    );
  }

  // 로그인 상태라면 대시보드로 이동
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {/* ✅ 이 안에 내용 다 넣기 */}
      <img src="/logo.png" alt="로고" className="w-32 h-32 mb-6" />
      <LoginForm />
    </PageTransition>
  );
}
