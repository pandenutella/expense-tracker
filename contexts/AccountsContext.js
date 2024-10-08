"use client";

import { findAllAccounts } from "@/services/accounts.service";
import { sortByProperty } from "@/utilities/array.utility";
import { createContext, useContext, useState } from "react";

export const AccountsContext = createContext();
export const useAccountsContext = () => useContext(AccountsContext);

export const AccountsContextProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetch = () => {
    setFetching(true);
    findAllAccounts()
      .then((accounts) => accounts.sort(sortByProperty("label")))
      .then(setAccounts)
      .finally(() => {
        setFetching(false);
        setFetched(true);
      });
  };

  const addAccount = (account) => {
    setAccounts((accounts) =>
      [...accounts, account].sort(sortByProperty("label"))
    );
  };

  return (
    <AccountsContext.Provider
      value={{ accounts, addAccount, fetch, fetching, fetched }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
