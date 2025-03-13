"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력하세요.")
      .email("올바른 이메일 형식을 입력하세요."),
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
    confirmPassword: z.string(),
    gender: z.enum(["male", "female", "other"], {
      required_error: "성별을 선택하세요.",
    }),
    height: z
      .number()
      .min(50, "신장을 입력하세요.")
      .max(250, "정확한 신장을 입력하세요."),
    weight: z
      .number()
      .min(20, "몸무게는 20kg 이상이어야 합니다.")
      .max(300, "몸무게는 250kg 이하로 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export default function SignPage() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("회원가입 요청:", data);
    // 여기서 회원가입 요청 API를 호출할 수 있음
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
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
