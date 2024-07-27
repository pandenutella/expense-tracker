"use client";

import usePrivateRoute from "@/hooks/usePrivateRoute";

export default function AppPage() {
  const { redirecting } = usePrivateRoute();

  if (redirecting) {
    return <></>;
  }

  return <></>;
}
