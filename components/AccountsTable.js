import { useAccountsContext } from "@/contexts/AccountsContext";
import useResponsiveValue from "@/hooks/useResponsiveValue";
import { EditOutlined, FundViewOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const phPeso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export default function AccountsTable() {
  const size = useResponsiveValue("medium", "small");
  const { accounts, fetch, fetching, fetched } = useAccountsContext();
  const router = useRouter();

  useEffect(() => {
    if (!fetched) {
      fetch();
    }
  }, []);

  const dataSource = useMemo(
    () => accounts.map((account) => ({ ...account, key: account.id })),
    [accounts]
  );

  const totalAmount = accounts.reduce(
    (totalAmount, account) => totalAmount + account.amount,
    0
  );

  const columns = [
    {
      key: "label",
      dataIndex: "label",
      title: "Account",
      render: (label, record) =>
        record.icon ? `${record.icon} ${label}` : label,
    },
    {
      key: "amount",
      dataIndex: "amount",
      title: phPeso.format(totalAmount),
      render: (amount) => phPeso.format(amount),
      align: "right",
    },
    {
      key: "actions",
      align: "right",
      render: (_, record) => (
        <Space>
          <Button
            icon={<FundViewOutlined />}
            onClick={() =>
              router.push(`/accounts/${record.labelLowerCase}/transactions`)
            }
          />
          <Button icon={<EditOutlined />} disabled />
        </Space>
      ),
    },
  ];

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      loading={fetching}
      size={size}
      locale={{
        emptyText: "No accounts",
      }}
    />
  );
}
