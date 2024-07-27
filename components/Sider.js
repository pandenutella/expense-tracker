"use client";

import { BankOutlined, CalculatorOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = ({ key }) => {
    router.push(key);
  };

  return (
    <Layout.Sider collapsible theme="dark">
      <Menu
        mode="inline"
        items={items}
        theme="dark"
        selectedKeys={pathname}
        onClick={handleClick}
      />
    </Layout.Sider>
  );
}
