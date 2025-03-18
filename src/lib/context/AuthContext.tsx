"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  gender?: string;
  height?: string;
  weight?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 로그인 함수
  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("로그인 실패");
    }

    const data = await res.json();
    setUser(data.user);
  };

  // 로그아웃 함수
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  // 서버에서 현재 로그인 상태 확인
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/cookie");
      if (res.ok) {
        const authData = await res.json();

        // 프로필 정보 가져오기
        const profileRes = await fetch("/api/auth/profile");
        if (profileRes.ok) {
          const profileData = await profileRes.json();

          // 기존 유저 정보 + 프로필 정보 병합
          setUser({ ...authData.user, ...profileData });
        } else {
          setUser(authData.user);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("checkAuth 오류:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth(); // 페이지 로드 시 로그인 상태 확인
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, setUser, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 커스텀 훅으로 사용하기 쉽게 만듦
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서 사용해야 합니다.");
  }
  return context;
}
