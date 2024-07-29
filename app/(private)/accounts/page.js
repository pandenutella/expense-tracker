"use client";

import AccountsTable from "@/components/AccountsTable";
import AddAccount from "@/components/AddAccount";
import useResponsiveValue from "@/hooks/useResponsiveValue";
import { FundViewOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row } from "antd";

export default function AppAccountsPage() {
  const vertical = useResponsiveValue(false, true);
  const justify = useResponsiveValue("flex-end", "flex-start");

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Flex gap={10} justify={justify} vertical={vertical}>
          <Button icon={<FundViewOutlined />} disabled>
            View All Transactions
          </Button>
          <AddAccount />
        </Flex>
      </Col>
      <Col span={24}>
        <AccountsTable />
      </Col>
    </Row>
  );
}
