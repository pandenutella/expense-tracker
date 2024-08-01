import useResponsiveValue from "@/hooks/useResponsiveValue";
import { Collapse } from "antd";
import { useMemo } from "react";
import BudgetTable from "./BudgetTable";

const phPeso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export default function BudgetCollapse() {
  const size = useResponsiveValue("medium", "small");

  const items = [
    {
      key: "bills",
      label: "Bills",
      children: <BudgetTable />,
      extra: phPeso.format(0),
    },
    {
      key: "needs",
      label: "Needs",
      children: <BudgetTable />,
      extra: phPeso.format(0),
    },
    {
      key: "wants",
      label: "Wants",
      children: <BudgetTable />,
      extra: phPeso.format(0),
    },
  ];

  const activeKeys = useMemo(() => items.map((item) => item.key), items);

  return <Collapse defaultActiveKey={activeKeys} items={items} size={size} />;
}
