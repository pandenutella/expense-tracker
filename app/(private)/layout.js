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
      <Header />
      <Layout>
        <Sider />
        <Content
          style={{
            padding: 20,
            maxHeight: "calc(100vh - 64px)",
            overflowY: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
      <AddTransactionButton />
    </>
  );
}
