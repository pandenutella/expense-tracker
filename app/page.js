"use client";

import { auth } from "@/firebase";
import usePrivateRoute from "@/hooks/usePrivateRoute";
import { Button, Layout, message } from "antd";
import { signOut } from "firebase/auth";

export default function HomePage() {
  usePrivateRoute("/login");

  const handleLogout = () => {
    signOut(auth).then(() => {
      message.success("Logged out successfully!");
    });
  };

  return (
    <Layout.Content>
      <Button onClick={handleLogout} type="primary" danger>
        Logout
      </Button>
    </Layout.Content>
  );
}
