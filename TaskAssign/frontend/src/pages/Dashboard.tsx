import PageTransition from "@/components/PageTransition";
import AppLayout from "@/layouts/AppLayout";

export default function DashboardPage() {
  return (
    <AppLayout>
      <PageTransition className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">대시보드</h1>
        </div>
        <p>환영합니다! 🎉</p>
      </PageTransition>
    </AppLayout>
  );
}
