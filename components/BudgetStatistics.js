"use client";

import { CategoryTypes } from "@/constants/categories.constant";
import { useBudgetCategoriesContext } from "@/contexts/BudgetCategoriesContext";
import useResponsiveValue from "@/hooks/useResponsiveValue";
import { Card, Col, Row, Statistic } from "antd";
import { useMemo } from "react";

export default function BudgetStatistics({ render }) {
  const span = useResponsiveValue(8, 24);
  const { categories } = useBudgetCategoriesContext();

  const unallocated = useMemo(
    () =>
      categories.find(
        (category) =>
          CategoryTypes.SYSTEM === category.type &&
          "Unallocated" === category.label
      )?.amount ?? 0,
    [categories]
  );

  if (0 === unallocated) {
    return <></>;
  }

  return render(
    <Row gutter={[20, 20]}>
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
    </Row>
  );
}
