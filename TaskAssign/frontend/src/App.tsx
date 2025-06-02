import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import DashboardPage from "@/pages/Dashboard";
import RootRedirect from "@/pages/RootRedirect";
import MyProjectsPage from "./pages/MyProjects";
import NotificationsPage from "./pages/Notifications";
import ChatsPage from "./pages/Chats";
import { AnimatePresence } from "framer-motion";

function App() {
  const { initializeAuth, isInitialized } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-sm text-gray-400">로딩 중...</span>
      </div>
    );
  }
  return (
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          <Route path="/" element={<RootRedirect />} /> {/* ✅ 루트 처리 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-projects"
            element={
              <ProtectedRoute>
                <MyProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chats"
            element={
              <ProtectedRoute>
                <ChatsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
