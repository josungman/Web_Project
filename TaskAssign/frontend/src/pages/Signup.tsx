// src/pages/SignupPage.tsx
import PageTransition from "@/components/PageTransition";
import SignupForm from "../components/SignupForm";
import { useAuthStore } from "@/store/auth";
import { Navigate } from "react-router-dom";

export default function SignupPage() {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  // 초기화 안 되었으면 아무것도 안 보여줌
  if (!isInitialized) return null;

  // 로그인 상태라면 대시보드로 이동
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <PageTransition className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6">
        <SignupForm />
      </div>
    </PageTransition>
  );
}
