import useFetchAllService from "@/hooks/useFetchAllService";
import { findAllAccounts } from "@/services/accounts.service";
import { Table } from "antd";

const phPeso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export default function AccountsTable() {
  const { data: accounts, fetching } = useFetchAllService(
    () => findAllAccounts(),
    (account) => ({
      ...account,
      amount: 0,
      key: account.id,
    })
  );

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
