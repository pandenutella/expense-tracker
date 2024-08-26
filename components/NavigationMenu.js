"use client";

import {
  BankOutlined,
  CalculatorOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
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
  {
    key: "/lending",
    label: "Lending",
    icon: <TransactionOutlined />,
  },
];

export default function NavigationMenu({ mode }) {
  const router = useRouter();
  const pathname = usePathname();

  const selectedKey =
    items.find((item) => pathname.startsWith(item.key))?.key ?? items[0].key;

  const handleClick = ({ key }) => {
    router.push(key);
  };

  return (
    <Menu
      mode={mode}
      items={items}
      theme="light"
      selectedKeys={[selectedKey]}
      onClick={handleClick}
    />
  );
}
