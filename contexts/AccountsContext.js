"use client";

import { findAllAccounts } from "@/services/accounts.service";
import { sortByProperty } from "@/utilities/array.utility";
import { createContext, useContext, useState } from "react";

export const AccountsContext = createContext();
export const useAccountsContext = () => useContext(AccountsContext);

const mapAccount = (account) => ({
  ...account,
  amount: 0,
  key: account.id,
});

export const AccountsContextProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetch = () => {
    setFetching(true);
    findAllAccounts()
      .then((accounts) => accounts.map(mapAccount))
      .then((accounts) => accounts.sort(sortByProperty("label")))
      .then(setAccounts)
      .finally(() => setFetching(false));
  };

  const addAccount = (account) => {
    setAccounts((accounts) =>
      [...accounts, mapAccount(account)].sort(sortByProperty("label"))
    );
  };

  return (
    <AccountsContext.Provider value={{ accounts, addAccount, fetch, fetching }}>
      {children}
    </AccountsContext.Provider>
  );
};
