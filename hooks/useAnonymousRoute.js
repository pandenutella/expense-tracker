"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAnonymousRoute(fallbackRoute) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user != null) {
      router.push(fallbackRoute);
    }
  }, [user]);
}
