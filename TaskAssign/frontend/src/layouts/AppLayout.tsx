// src/layouts/AppLayout.tsx
import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex">
      {/* Sidebar: PC만 보임 */}
      <Sidebar className="hidden sm:flex" />

      <div className="flex-1 flex flex-col">
        {/* Header: PC만 보임 */}
        <Header className="hidden sm:flex" />
        <MobileHeader /> {/* 모바일 전용 헤더 */}
        {/* 메인 콘텐츠 */}
        <main className="flex-1">{children}</main>
        {/* 모바일 하단 네비게이션: sm 이하에서만 보임 */}
        <MobileNav className="fixed bottom-0 w-full sm:hidden" />
      </div>
    </div>
  );
}
