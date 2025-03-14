"use client";

import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";

export default function LoginButton() {
  const { user, logout } = useAuth();
  return user ? (
    <div className="flex justify-between">
      <p className="text-gray-700 font-medium pr-3">{user.email}</p>
      <button
        className="text-gray-700 font-medium hover:underline cursor-pointer"
        onClick={logout}
      >
        로그아웃
      </button>
    </div>
  ) : (
    <Link
      href="/login"
      className="text-gray-700 font-medium hover:underline cursor-pointer"
    >
      로그인
    </Link>
  );
}
