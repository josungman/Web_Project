import { cn } from "@/lib/utils"; // className 병합 유틸이 있다면 사용
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, ChevronDown, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Sidebar({ className = "" }: { className?: string }) {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <aside className={cn("w-60 bg-white border-r h-full p-4 hidden sm:flex flex-col justify-between bg-purple-100", className)}>
      <div className="flex flex-col flex-1">
        {/* 상단 로고 */}
        <img src="/logo.png" alt="logo" className="w-12 h-12 rounded-full object-cover mx-auto mb-6" />

        {/* 접기/펼치기 버튼 */}
        <button className="flex items-center justify-between w-full text-sm font-semibold mb-2 text-gray-600 hover:text-gray-900" onClick={() => setMenuOpen((prev) => !prev)}>
          <span>작업 메뉴</span>
          {menuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* 부드러운 애니메이션 메뉴 */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden flex flex-col space-y-2"
            >
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-md font-medium px-2 py-1 rounded ${isActive ? "bg-purple-200 text-purple-800" : "text-purple-700"} hover:bg-purple-200`
                }
              >
                <LayoutDashboard className="w-4 h-4" />
                대시보드
              </NavLink>

              <NavLink
                to="/my-projects"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-md font-medium px-2 py-1 rounded ${isActive ? "bg-purple-200 text-purple-800" : "text-purple-700"} hover:bg-purple-200`
                }
              >
                <Calendar className="w-4 h-4" />내 프로젝트
              </NavLink>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
