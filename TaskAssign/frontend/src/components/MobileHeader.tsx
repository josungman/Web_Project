// src/components/MobileHeader.tsx
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { toast } from "react-toastify";
import { Search, LogOut } from "lucide-react";

export default function MobileHeader() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    toast.info("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <header className="h-12 px-4 flex items-center justify-between bg-purple-100 border-b sm:hidden">
      <img src="/logo.png" alt="profile" className="w-8 h-8 rounded-full border" />

      <div className="flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-700" />

        <button onClick={handleLogout} className="text-xs px-2 py-0.5 border rounded text-gray-700">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
