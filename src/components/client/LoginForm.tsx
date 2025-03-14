"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api/auth";
import { LoginData, User } from "@/lib/types/auth";
import { loginSchema } from "@/lib/validation/authSchema";
import { useAuth } from "@/lib/context/AuthContext";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { setUser } = useAuth();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: { user: User }) => {
      setUser(data.user); // ✅ 로그인 후 상태 업데이트
      router.push("/");
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  // 로그인 처리
  const onSubmit = (data: LoginData) => {
    try {
      mutation.mutate(data);
    } catch (error) {
      setErrorMessage("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">로그인</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold">이메일</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded"
              placeholder="이메일을 입력하세요."
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block">비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              {...register("password")}
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="mt-4 text-right">
            <button
              type="button"
              onClick={() => router.push("/sign")}
              className="text-gray-400 font-semibold hover:underline cursor-pointer"
            >
              회원가입
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold p-2 mt-4 rounded hover:bg-blue-700 transition"
          >
            로그인
          </button>
        </form>

        <p className="text-red-500 mt-2 text-center">{errorMessage}</p>
      </div>
    </div>
  );
}
