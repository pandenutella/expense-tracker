import useFetchAllService from "@/hooks/useFetchAllService";
import useResponsiveValue from "@/hooks/useResponsiveValue";
import { findAllAccounts } from "@/services/accounts.service";
import { EditOutlined, FundViewOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";

const phPeso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export default function AccountsTable() {
  const size = useResponsiveValue("medium", "small");

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
    {
      key: "actions",
      align: "right",
      render: () => (
        <Space>
          <Button icon={<FundViewOutlined />} disabled />
          <Button icon={<EditOutlined />} disabled />
        </Space>
      ),
    },
  ];

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={accounts}
      loading={fetching}
      size={size}
    />
  );
}
