"use client";

import { auth } from "@/firebase";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Layout, message } from "antd";
import { signOut } from "firebase/auth";

export default function Header() {
  const handleUserActions = ({ key }) => {
    if ("logout" === key) {
      handleLogout();
    }
  };

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
        <Dropdown
          menu={{
            items: [
              {
                key: "logout",
                label: "Logout",
              },
            ],
            onClick: handleUserActions,
          }}
        >
          <Button shape="circle">
            <Avatar icon={<UserOutlined />} />
          </Button>
        </Dropdown>
      </Flex>
    </Layout.Header>
  );
}
