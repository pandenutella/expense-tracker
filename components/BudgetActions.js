import useResponsiveValue from "@/hooks/useResponsiveValue";
import { Flex } from "antd";
import AddBudgetCategory from "./AddBudgetCategory";

export default function BudgetActions() {
  const vertical = useResponsiveValue(false, true);
  const justify = useResponsiveValue("flex-end", "flex-start");

  return (
    <Flex gap={10} justify={justify} vertical={vertical}>
      <AddBudgetCategory />
    </Flex>
  );
}
