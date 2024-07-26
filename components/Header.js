"use client";

import { auth } from "@/firebase";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, message } from "antd";
import { signOut } from "firebase/auth";

export default function Header() {
  const handleLogout = () => {
    signOut(auth).then(() => {
      message.success("Logged out successfully!");
    });
  };

  return (
    <Layout.Header style={{ backgroundColor: "white" }}>
      <Flex
        justify="flex-end"
        align="center"
        gap={10}
        style={{ height: "100%" }}
      >
        <Button icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Layout.Header>
  );
}
