"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";

export default function LoginButton() {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    return (
      <div className="relative group">
        <button className="text-gray-700 font-medium cursor-pointer hover:underline">
          {user?.email}
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="text-gray-700 font-medium cursor-pointer hover:underline"
    >
      로그인
    </Link>
  );
}
