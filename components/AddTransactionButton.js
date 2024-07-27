"use client";

import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

export default function AddTransactionButton() {
  return (
    <FloatButton
      icon={<PlusOutlined />}
      type="primary"
      tooltip="Add Transaction"
    />
  );
}
