// src/components/LoginForm.tsx

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// ✅ Zod 스키마 정의
const loginSchema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
  password: z.string().min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: LoginFormValues) => {
    console.log("🟢 제출된 데이터:", data);
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto mt-8">
      <div>
        <label className="block text-sm font-medium">이메일</label>
        <Input type="email" {...register("email")} />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">비밀번호</label>
        <Input type="password" {...register("password")} />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        로그인
      </Button>

      {submitted && <p className="text-green-600 text-sm mt-2">✅ 로그인 시도 완료!</p>}
    </form>
  );
}
