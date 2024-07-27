"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAnonymousRoute() {
  const { user } = useAuthContext();
  const router = useRouter();

  const redirecting = user != null;
  useEffect(() => {
    if (redirecting) {
      router.push("/");
    }
  }, [redirecting]);

  return { redirecting };
}
