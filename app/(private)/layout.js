"use client";

import AddTransactionButton from "@/components/AddTransactionButton";
import Header from "@/components/Header";
import Sider from "@/components/Sider";
import usePrivateRoute from "@/hooks/usePrivateRoute";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export default function AppLayout({ children }) {
  const { redirecting } = usePrivateRoute();
  if (redirecting) {
    return <></>;
  }

  return (
    <>
      <Sider />
      <Layout>
        <Header />
        <Content style={{ padding: 20 }}>{children}</Content>
      </Layout>
      <AddTransactionButton />
    </>
  );
}
