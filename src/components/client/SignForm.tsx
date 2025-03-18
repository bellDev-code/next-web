"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signUpUser } from "@/lib/api/auth";
import { signUpSchema } from "@/lib/validation/authSchema";
import { useRouter } from "next/navigation";

export default function SignForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      setSuccessMessage(
        "회원가입이 완료되었습니다! 로그인 페이지로 이동합니다."
      );
      router.push("/login");
    },
    onError: (error: any) => {
      setErrorMessage(error.message || "회원가입 중 오류가 발생했습니다.");
      setSuccessMessage("");
    },
  });

  const onSubmit = (data: any) => {
    setErrorMessage(""); // 기존 에러 초기화
    setSuccessMessage(""); // 성공 메시지 초기화
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">회원가입</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold">이메일</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded"
              placeholder="이메일을 입력하세요"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block">성별</label>
            <select
              {...register("gender")}
              className="w-full p-2 border rounded"
            >
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="other">크레파스</option>
            </select>
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>
          <div>
            <label className="block">신장 (cm)</label>
            <input
              type="number"
              {...register("height", { valueAsNumber: true })}
              className="w-full p-2 border rounded"
              placeholder="키를 입력하세요"
            />
            {errors.height && (
              <p className="text-red-500">{errors.height.message}</p>
            )}
          </div>
          <div>
            <label className="block">몸무게 (kg)</label>
            <input
              type="number"
              {...register("weight", { valueAsNumber: true })}
              className="w-full p-2 border rounded"
              placeholder="몸무게를 입력하세요"
            />
            {errors.weight && (
              <p className="text-red-500">{errors.weight.message}</p>
            )}
          </div>
          <div>
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
          <div>
            <label className="block">비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호와 동일하게 입력하세요."
              {...register("confirmPassword")}
              className="w-full p-2 border rounded"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
