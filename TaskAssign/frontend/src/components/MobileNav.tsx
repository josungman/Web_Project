// src/components/MobileNav.tsx
import { cn } from "@/lib/utils";
import { Bell, LayoutDashboard, Calendar, MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function MobileNav({ className = "" }: { className?: string }) {
  return (
    <nav className={cn("bg-white border-t flex justify-around py-2", className)}>
      <NavLink to="/dashboard" className="flex flex-col items-center text-xs text-gray-600">
        <LayoutDashboard className="w-5 h-5" />
        대시보드
      </NavLink>
      <NavLink to="/my-projects" className="flex flex-col items-center text-xs text-gray-600">
        <Calendar className="w-5 h-5" />
        프로젝트
      </NavLink>
      <NavLink to="/notification" className="flex flex-col items-center text-xs text-gray-600">
        <Bell className="w-5 h-5" />
        알림
      </NavLink>
      <NavLink to="/chats" className="flex flex-col items-center text-xs text-gray-600">
        <MessageSquare className="w-5 h-5" />
        채팅
      </NavLink>
    </nav>
  );
}
