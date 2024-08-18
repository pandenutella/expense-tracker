"use client";

import { useAccountsContext } from "@/contexts/AccountsContext";
import { findByLabel } from "@/services/accounts.service";
import { decodeUriString } from "@/utilities/string.utility";
import { Breadcrumb, Spin } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ViewAccountTransactionsPage({ params }) {
  const { label } = params;
  const [account, setAccount] = useState(null);
  const [fetching, setFetching] = useState(true);
  const { accounts } = useAccountsContext();

  useEffect(() => {
    const decodedLabelLowerCase = decodeUriString(label).toLowerCase();
    const cachedAccount = accounts.find(
      (a) => a.label === decodedLabelLowerCase
    );

    if (cachedAccount) {
      setAccount(cachedAccount);
      setFetching(false);
    } else {
      findByLabel(decodedLabelLowerCase)
        .then(setAccount)
        .finally(() => setFetching(false));
    }
  }, [label]);

  if (fetching) {
    return <Spin />;
  }

  const items = [
    {
      title: <Link href="/accounts">Accounts</Link>,
    },
    {
      title: account.label,
    },
  ];

  return <Breadcrumb items={items} />;
}
