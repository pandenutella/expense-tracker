"use client";

import BasicLoginForm from "@/components/BasicLoginForm";
import useAnonymousRoute from "@/hooks/useAnonymousRoute";
import { LoginOutlined } from "@ant-design/icons";
import { Card, Layout } from "antd";

export default function LoginPage() {
  const { redirecting } = useAnonymousRoute();

  if (redirecting) {
    return <></>;
  }

  return (
    <Layout.Content
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{ width: 400 }}
        title={<LoginOutlined />}
        extra="Login to Expense Tracker"
      >
        <BasicLoginForm />
      </Card>
    </Layout.Content>
  );
}
