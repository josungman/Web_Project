import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { signup, login } from "@/services/authService";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

// ✅ 유효성 검사 스키마
const schema = z
  .object({
    username: z.string().min(1, "이름을 입력해주세요."),
    email: z.string().email("유효한 이메일을 입력해주세요."),
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요."),
    photo: z
      .any()
      .refine(
        (value) => {
          if (!value || !(value instanceof FileList) || value.length === 0) return true;
          const file = value[0];
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
          return allowedTypes.includes(file.type);
        },
        {
          message: "지원하지 않는 이미지 형식입니다. (jpg, png, gif)",
        }
      )
      .refine(
        (value) => {
          if (!value || !(value instanceof FileList) || value.length === 0) return true;
          const file = value[0];
          return file.size <= 5 * 1024 * 1024;
        },
        {
          message: "파일 크기는 5MB 이하만 업로드 가능합니다.",
        }
      )
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function SignupForm() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const photoFile = watch("photo")?.[0];

  // ❗ 잘못된 파일 선택 시 input 초기화
  useEffect(() => {
    const file = watch("photo")?.[0];
    if (!file || !photoInputRef.current) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    const isInvalid = !allowedTypes.includes(file.type) || file.size > 5 * 1024 * 1024;

    if (isInvalid) {
      photoInputRef.current.value = "";
    }
  }, [watch("photo")]);

  const onSubmit = async (data: FormValues) => {
    if (!isValid) return;

    try {
      await signup({
        username: data.username,
        email: data.email,
        password: data.password,
        photo: data.photo?.[0],
      });

      const result = await login(data.email, data.password);
      setAuth(result.user, result.token, result.refreshToken);

      toast.success("회원가입 및 로그인 성공!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error("회원가입 실패: " + (err?.response?.data ? Object.values(err.response.data).flat().join(", ") : "알 수 없는 오류"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-md sm:max-w-lg mx-auto space-y-5 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center">회원가입</h2>

      {/* 이메일 */}
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          이메일
        </label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      {/* 이름 */}
      <div className="space-y-1">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          이름
        </label>
        <Input id="username" {...register("username")} />
        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
      </div>

      {/* 비밀번호 */}
      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          비밀번호
        </label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      {/* 비밀번호 확인 */}
      <div className="space-y-1">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          비밀번호 확인
        </label>
        <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
      </div>

      {/* 프로필 사진 */}
      <div className="space-y-1">
        <label htmlFor="photo" className="text-sm font-medium text-gray-700">
          프로필 사진
        </label>
        <Input
          id="photo"
          type="file"
          accept="image/*"
          {...register("photo")}
          ref={(e) => {
            register("photo").ref(e);
            photoInputRef.current = e;
          }}
        />
        {errors.photo?.message && typeof errors.photo.message === "string" && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}

        <div className="pt-4">
          {!photoFile && <img src="/default-profile.png" alt="기본 이미지" className="w-24 h-24 object-cover rounded" />}
          {photoFile && ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(photoFile.type) && (
            <img src={URL.createObjectURL(photoFile)} alt="미리보기" className="w-24 h-24 object-cover rounded" />
          )}
        </div>
      </div>

      {/* 버튼 */}
      <Button type="submit" className="w-full" disabled={!isValid}>
        회원가입
      </Button>
    </form>
  );
}
