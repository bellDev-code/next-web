"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

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
    const res = await fetch("/api/auth/cookie");
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth(); // 페이지 로드 시 로그인 상태 확인
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, checkAuth }}>
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
