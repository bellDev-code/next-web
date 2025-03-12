"use client";

import dynamic from "next/dynamic";

const LoginButton = dynamic(() => import("@/components/client/LoginButton"), {
  ssr: false,
});

export default function LoginButtonWrapper() {
  return <LoginButton />;
}
