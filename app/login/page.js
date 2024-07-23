"use client";

import LoginForm from "@/components/LoginForm";
import useAnonymousRoute from "@/hooks/useAnonymousRoute";
import { LoginOutlined } from "@ant-design/icons";
import { Card, Layout } from "antd";

export default function LoginPage() {
  useAnonymousRoute("/");

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
        <LoginForm />
      </Card>
    </Layout.Content>
  );
}
