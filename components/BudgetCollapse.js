import { CategoryTypes } from "@/constants/categories.constant";
import { useBudgetCategoriesContext } from "@/contexts/BudgetCategoriesContext";
import useResponsiveValue from "@/hooks/useResponsiveValue";
import { Collapse, Spin } from "antd";
import { useEffect } from "react";
import BudgetCategoriesTable from "./BudgetCategoriesTable";
import BudgetCreditCategoriesTable from "./BudgetCreditCategoriesTable";

const phPeso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

const filterByType = (type) => (category) => type === category.type;
const reduceToTotal = (total, bill) => total + bill.amount;

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

  const items = [];

  const creditCards = categories.filter(
    filterByType(CategoryTypes.CREDIT_CARDS)
  );
  if (creditCards.length) {
    const creditCardsAmount = creditCards.reduce(reduceToTotal, 0);
    items.push({
      key: "credit-cards",
      label: "Credit Cards",
      children: <BudgetCreditCategoriesTable categories={creditCards} />,
      extra: phPeso.format(creditCardsAmount),
    });
  }

  const bills = categories.filter(filterByType(CategoryTypes.BILLS));
  const billsAmount = bills.reduce(reduceToTotal, 0);
  items.push({
    key: "bills",
    label: "Bills",
    children: <BudgetCategoriesTable categories={bills} />,
    extra: phPeso.format(billsAmount),
  });

  const needs = categories.filter(filterByType(CategoryTypes.NEEDS));
  const needsAmount = needs.reduce(reduceToTotal, 0);
  items.push({
    key: "needs",
    label: "Needs",
    children: <BudgetCategoriesTable categories={needs} />,
    extra: phPeso.format(needsAmount),
  });

  const wants = categories.filter(filterByType(CategoryTypes.WANTS));
  const wantsAmount = wants.reduce(reduceToTotal, 0);
  items.push({
    key: "wants",
    label: "Wants",
    children: <BudgetCategoriesTable categories={wants} />,
    extra: phPeso.format(wantsAmount),
  });

  const activeKeys = items.map((item) => item.key);

  return <Collapse defaultActiveKey={activeKeys} items={items} size={size} />;
}
