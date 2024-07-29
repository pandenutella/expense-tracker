"use client";

import useResponsiveValue from "@/hooks/useResponsiveValue";
import { BankOutlined, CalculatorOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import NavigationMenu from "./NavigationMenu";

const items = [
  {
    key: "/budget",
    label: "Budget",
    icon: <CalculatorOutlined />,
  },
  {
    key: "/accounts",
    label: "Accounts",
    icon: <BankOutlined />,
  },
];

export default function Sider() {
  const desktop = useResponsiveValue(true, false);

  if (desktop) {
    return (
      <Layout.Sider collapsible theme="dark">
        <NavigationMenu mode="inline" />
      </Layout.Sider>
    );
  }

  return (
    <Layout.Footer
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        padding: 0,
      }}
    >
      <NavigationMenu mode="horizontal" />
    </Layout.Footer>
  );
}
