import AppLayout from "@/layouts/AppLayout";
import PageTransition from "@/components/PageTransition";

export default function MyProjectsPage() {
  return (
    <AppLayout>
      <PageTransition className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">내프로잭트</h1>
        </div>
        <p>환영합니다! 🎉</p>
      </PageTransition>
    </AppLayout>
  );
}
