"use client";

import useAnonymousRoute from "@/hooks/useAnonymousRoute";

export default function AppLayout({ children }) {
  const { redirecting } = useAnonymousRoute();

  return redirecting ? <></> : children;
}
