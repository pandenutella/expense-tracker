"use client";

import Header from "@/components/Header";
import usePrivateRoute from "@/hooks/usePrivateRoute";
import { Layout } from "antd";

export default function HomePage() {
  usePrivateRoute();

  return (
    <>
      <Header />
      <Layout.Content></Layout.Content>
    </>
  );
}
