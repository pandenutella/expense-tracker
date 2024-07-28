import { findAllAccounts } from "@/services/accounts.service";
import { Table } from "antd";
import { useEffect, useState } from "react";

const phPeso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export default function AccountsTable() {
  const [accounts, setAccounts] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    findAllAccounts()
      .then((accounts) => {
        setAccounts(
          accounts.map((account) => ({
            ...account,
            amount: 0,
            key: account.id,
          }))
        );
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  const totalAmount = accounts.reduce(
    (totalAmount, account) => totalAmount + account.amount,
    0
  );

  const columns = [
    {
      key: "label",
      dataIndex: "label",
      title: "Budget",
    },
    {
      key: "amount",
      dataIndex: "amount",
      title: phPeso.format(totalAmount),
      render: (amount) => phPeso.format(amount),
      align: "right",
    },
  ];

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={accounts}
      loading={fetching}
    />
  );
}
