"use client";

import Link from "next/link";

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="text-gray-700 font-medium cursor-pointer hover:underline"
    >
      로그인
    </Link>
  );
}
