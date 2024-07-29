"use client";

import { BankOutlined, CalculatorOutlined } from "@ant-design/icons";
import { Menu } from "antd";
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

export default function NavigationMenu({ mode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = ({ key }) => {
    router.push(key);
  };

  return (
    <Menu
      mode={mode}
      items={items}
      theme="dark"
      selectedKeys={pathname}
      onClick={handleClick}
    />
  );
}
