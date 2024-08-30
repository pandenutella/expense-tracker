"use client";

import { findAllCategories } from "@/services/categories.service";
import { sortByProperty } from "@/utilities/array.utility";
import { createContext, useContext, useState } from "react";

export const BudgetCategoriesContext = createContext();
export const useBudgetCategoriesContext = () =>
  useContext(BudgetCategoriesContext);

export const BudgetCategoriesContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetch = () => {
    setFetching(true);
    findAllCategories()
      .then((categories) => categories.sort(sortByProperty("label")))
      .then(setCategories)
      .finally(() => {
        setFetching(false);
        setFetched(true);
      });
  };

  const addCategory = (category) => {
    setCategories((categories) =>
      [...categories, category].sort(sortByProperty("label"))
    );
  };

  return (
    <BudgetCategoriesContext.Provider
      value={{
        categories,
        addCategory,
        fetch,
        fetching,
        fetched,
      }}
    >
      {children}
    </BudgetCategoriesContext.Provider>
  );
};
