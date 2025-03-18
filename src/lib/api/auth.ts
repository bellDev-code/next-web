import { SignUpData, LoginData } from "@/lib/types/auth";

// 회원가입
export const signUpUser = async (data: SignUpData) => {
  const response = await fetch("/api/auth/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("회원가입 실패");

  return await response.json();
};

// 로그인
export const loginUser = async (data: LoginData) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("로그인 실패");

  return await response.json();
};

// 세션가져오기
export async function fetchSession() {
  try {
    const res = await fetch("/api/auth/session", {
      credentials: "include", // ✅ 쿠키 포함 요청
    });

    if (!res.ok) throw new Error("세션 없음");

    const data = await res.json();
    return data.user; // 유저 정보 반환
  } catch (error) {
    console.error("fetchSession 오류:", error);
    return null;
  }
}

// 유저 정보 가져오기
export async function fetchUserInfo() {
  try {
    const res = await fetch("/api/auth/profile", {
      credentials: "include",
    });

    if (!res.ok) throw new Error("세션 없음");

    const data = await res.json();

    return data.userInfo;
  } catch (error) {
    console.error("fetchUserInfo 오류:", error);
    return null;
  }
}
