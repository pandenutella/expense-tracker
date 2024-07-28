"use client";

import AccountsTable from "@/components/AccountsTable";
import { Col, Row } from "antd";

export default function AppAccountsPage() {
  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <AccountsTable />
      </Col>
    </Row>
  );
}
