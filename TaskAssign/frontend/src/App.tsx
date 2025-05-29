import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { getUsers } from "@/services/userService";

function App() {
  const handleClick = async () => {
    try {
      const users = await getUsers();
      console.log(users);
      toast.success("유저 로딩 성공!");
    } catch {
      toast.error("유저 로딩 실패 😢");
    }
  };

  return (
    <div className="p-6">
      <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded">
        사용자 불러오기
      </button>
      <ToastContainer />
    </div>
  );
}

export default App;
