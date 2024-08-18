"use client";

import BudgetCollapse from "@/components/BudgetCollapse";
import BudgetStatistics from "@/components/BudgetStatistics";
import { Col, Row } from "antd";

export default function AppBudgetPage() {
  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <BudgetStatistics />
      </Col>
      <Col span={24}>
        <BudgetCollapse />
      </Col>
    </Row>
  );
}
