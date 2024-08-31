"use client";

import BudgetActions from "@/components/BudgetActions";
import BudgetCollapse from "@/components/BudgetCollapse";
import BudgetStatistics from "@/components/BudgetStatistics";
import { Col, Row } from "antd";

export default function AppBudgetPage() {
  return (
    <Row gutter={[20, 20]}>
      <BudgetStatistics render={(element) => <Col span={24}>{element}</Col>} />
      <Col span={24}>
        <BudgetActions />
      </Col>
      <Col span={24}>
        <BudgetCollapse />
      </Col>
    </Row>
  );
}
