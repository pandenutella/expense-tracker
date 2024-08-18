"use client";

import useResponsiveValue from "@/hooks/useResponsiveValue";
import { Card, Col, Row, Statistic } from "antd";

export default function BudgetStatistics() {
  const span = useResponsiveValue(8, 24);

  const unallocated = 112893;

  return (
    <Row gutter={[20, 20]}>
      {unallocated && (
        <Col span={span}>
          <Card bordered={false}>
            <Statistic
              title="Unallocated"
              prefix="₱"
              value={unallocated}
              precision={2}
            />
          </Card>
        </Col>
      )}
    </Row>
  );
}
