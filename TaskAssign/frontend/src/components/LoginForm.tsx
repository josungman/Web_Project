import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { login } from "@/services/authService";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email("유효한 이메일을 입력하세요"),
  password: z.string().min(6, "6자 이상 입력해주세요"),
  autoLogin: z.boolean().optional(), // ✅ 자동 로그인 필드 추가
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const navigate = useNavigate(); // ✅ 라우터 훅 사용
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      autoLogin: localStorage.getItem("autoLogin") === "true", // ✅ 기본값 반영
    },
  });

  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await login(data.email, data.password);
      setAuth(res.user, res.token, res.refreshToken);

      // ✅ 자동 로그인 체크 여부에 따라 저장
      if (data.autoLogin) {
        localStorage.setItem("autoLogin", "true");
        localStorage.setItem("refreshToken", res.refreshToken); // ✅ 저장
      } else {
        localStorage.removeItem("autoLogin");
        localStorage.removeItem("refreshToken"); // ✅ 비우기
      }

      toast.success("로그인 성공!");

      navigate("/dashboard"); // ✅ 로그인 성공 시 대시보드 이동
    } catch (err: any) {
      toast.error("로그인 실패: " + (err?.response?.data?.message || "알 수 없는 오류"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-5 bg-white p-6 rounded-2xl shadow-md sm:mx-auto">
      <h2 className="text-2xl font-bold text-center">로그인</h2>

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          이메일
        </label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          비밀번호
        </label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="autoLogin" {...register("autoLogin")} className="w-4 h-4" />
        <label htmlFor="autoLogin" className="text-sm text-gray-600">
          자동 로그인
        </label>
      </div>

      <Button type="submit" className="w-full">
        로그인
      </Button>

      {/* ✅ 회원가입 링크 하단에 위치 */}
      <div className="text-center mt-2">
        <span className="text-sm text-gray-600">계정이 없으신가요? </span>
        <Link to="/signup" className="text-sm text-blue-600 hover:underline">
          회원가입
        </Link>
      </div>
    </form>
  );
}
