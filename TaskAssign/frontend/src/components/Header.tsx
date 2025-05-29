// src/components/Header.tsx
import { cn } from "@/lib/utils"; // className 병합 유틸
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { toast } from "react-toastify";
import { Bell, MessageSquare } from "lucide-react";

export default function Header({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    toast.info("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <header className={cn("h-14 px-4 flex items-center justify-between border-b bg-gradient-to-r from-purple-100 to-white shadow-sm", className)}>
      <div className="text-xl font-bold text-primary"></div>

      <input type="text" placeholder="전체 검색" className="border rounded-full px-4 py-1 text-sm w-40 sm:w-64 focus:outline-none focus:ring focus:border-blue-300" />

      <div className="flex items-center gap-4">
        {/* 메시지 아이콘 */}
        <NavLink to="/chats" className="flex flex-col items-center text-xs text-gray-600">
          <MessageSquare className="w-5 h-5 text-gray-700" />
        </NavLink>

        {/* 알림 아이콘 */}
        <NavLink to="/notification" className="flex flex-col items-center text-xs text-gray-600 relative">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[12px] font-bold rounded-full px-1.5">192</span>
        </NavLink>

        {/* 프로필 */}
        <img src="/profile.png" alt="profile" className="w-8 h-8 rounded-full border" />

        {/* 로그아웃 버튼 */}
        <button onClick={handleLogout} className="text-sm px-3 py-1 rounded border text-gray-700 hover:bg-gray-100">
          로그아웃
        </button>
      </div>
    </header>
  );
}
