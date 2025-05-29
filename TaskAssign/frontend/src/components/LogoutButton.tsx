import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}
