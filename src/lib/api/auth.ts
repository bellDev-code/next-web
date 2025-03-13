import { SignUpData, LoginData } from "@/lib/types/auth";

export const signUpUser = async (data: SignUpData) => {
  const response = await fetch("/api/auth/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("회원가입 실패");

  return await response.json();
};

export const loginUser = async (data: LoginData) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("로그인 실패");

  return await response.json();
};
