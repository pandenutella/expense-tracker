import { useBudgetCategoriesContext } from "@/contexts/BudgetCategoriesContext";
import useResponsiveValue from "@/hooks/useResponsiveValue";
import { Collapse, Spin } from "antd";
import { useEffect } from "react";
import BudgetCategoriesTable from "./BudgetCategoriesTable";

const phPeso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

const filterByType = (type) => (category) => type === category.type;
const reduceToTotal = (total, bill) => total + bill.remaining;

export default function BudgetCollapse() {
  const size = useResponsiveValue("medium", "small");
  const { categories, fetch, fetching, fetched } = useBudgetCategoriesContext();

  useEffect(() => {
    if (!fetched) {
      fetch();
    }
  }, []);

  if (fetching) {
    return <Spin />;
  }

  const bills = categories.filter(filterByType("BILLS"));
  const billsRemaining = bills.reduce(reduceToTotal, 0);

  const needs = categories.filter(filterByType("NEEDS"));
  const needsRemaining = needs.reduce(reduceToTotal, 0);

  const wants = categories.filter(filterByType("WANTS"));
  const wantsRemaining = wants.reduce(reduceToTotal, 0);

  const items = [
    {
      key: "bills",
      label: "Bills",
      children: <BudgetCategoriesTable categories={bills} />,
      extra: phPeso.format(billsRemaining),
    },
    {
      key: "needs",
      label: "Needs",
      children: <BudgetCategoriesTable categories={needs} />,
      extra: phPeso.format(needsRemaining),
    },
    {
      key: "wants",
      label: "Wants",
      children: <BudgetCategoriesTable categories={wants} />,
      extra: phPeso.format(wantsRemaining),
    },
  ];

  const activeKeys = items.map((item) => item.key);

  return <Collapse defaultActiveKey={activeKeys} items={items} size={size} />;
}
