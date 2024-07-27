"use client";

import BasicLoginForm from "@/components/BasicLoginForm";
import { LoginOutlined } from "@ant-design/icons";
import { Card, Layout } from "antd";

export default function LoginPage() {
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
