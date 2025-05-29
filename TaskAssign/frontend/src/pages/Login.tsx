import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

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
