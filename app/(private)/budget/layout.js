import { BudgetCategoriesContextProvider } from "@/contexts/BudgetCategoriesContext";

export default function BudgetLayout({ children }) {
  return (
    <BudgetCategoriesContextProvider>
      {children}
    </BudgetCategoriesContextProvider>
  );
}
