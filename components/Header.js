"use client";

import { auth } from "@/firebase";
import useResponsiveValue from "@/hooks/useResponsiveValue";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Layout, message } from "antd";
import { signOut } from "firebase/auth";

export default function Header() {
  const padding = useResponsiveValue(50, 20);

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
    <Layout.Header
      style={{
        backgroundColor: "white",
        borderBottomColor: "rgb(240, 240, 240)",
        borderBottomStyle: "solid",
        borderBottomWidth: 0.8,
        paddingLeft: padding,
        paddingRight: padding,
      }}
    >
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
