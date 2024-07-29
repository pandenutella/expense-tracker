"use client";

import useResponsiveValue from "@/hooks/useResponsiveValue";
import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

export default function AddTransactionButton() {
  const bottom = useResponsiveValue(undefined, 94);

  return (
    <FloatButton
      icon={<PlusOutlined />}
      type="primary"
      tooltip="Add Transaction"
      style={{ bottom }}
    />
  );
}
