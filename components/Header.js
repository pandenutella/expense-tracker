"use client";

import { useThemeContext } from "@/contexts/ThemeContext";
import { auth } from "@/firebase";
import useResponsiveValue from "@/hooks/useResponsiveValue";
import { MoonOutlined, SunOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Layout,
  message,
  Segmented,
} from "antd";
import { signOut } from "firebase/auth";

export default function Header() {
  const { mode, setMode } = useThemeContext();
  const padding = useResponsiveValue(50, 20);

  const handleThemeChange = (value) => {
    setMode(value);
  };

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
        <Segmented
          value={mode}
          onChange={handleThemeChange}
          options={[
            {
              value: "light",
              icon: <SunOutlined />,
            },
            {
              value: "dark",
              icon: <MoonOutlined />,
            },
          ]}
        />
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
