"use client";

import useResponsiveValue from "@/hooks/useResponsiveValue";
import {
  SwapLeftOutlined,
  SwapOutlined,
  SwapRightOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";

export default function AddTransactionButton() {
  const bottom = useResponsiveValue(undefined, 94);

  return (
    <FloatButton.Group
      trigger="click"
      icon={<TransactionOutlined />}
      type="primary"
      tooltip="Transact"
      shape="square"
      style={{ bottom }}
    >
      <FloatButton icon={<SwapOutlined />} tooltip="Transfer" />
      <FloatButton icon={<SwapLeftOutlined />} tooltip="Inflow" />
      <FloatButton icon={<SwapRightOutlined />} tooltip="Outflow" />
    </FloatButton.Group>
  );
}
