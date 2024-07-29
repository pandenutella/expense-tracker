"use client";

import { useAccountsContext } from "@/contexts/AccountsContext";
import { findById } from "@/services/accounts.service";
import { Breadcrumb, Spin } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ViewAccountsPage({ params }) {
  const { id } = params;
  const [account, setAccount] = useState(null);
  const [fetching, setFetching] = useState(true);
  const { accounts } = useAccountsContext();

  useEffect(() => {
    const cachedAccount = accounts.find((a) => a.id === id);

    if (cachedAccount) {
      setAccount(cachedAccount);
      setFetching(false);
    } else {
      findById(id)
        .then(setAccount)
        .finally(() => setFetching(false));
    }
  }, [id]);

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
