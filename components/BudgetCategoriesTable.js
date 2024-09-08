import useResponsiveValue from "@/hooks/useResponsiveValue";
import { sortByProperty } from "@/utilities/array.utility";
import { EditOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { useMemo } from "react";

const phPeso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

const columns = [
  {
    key: "label",
    dataIndex: "label",
    title: "Category",
  },
  {
    key: "amount",
    dataIndex: "amount",
    title: "Amount",
    render: (amount) => phPeso.format(amount),
    align: "right",
  },
  {
    key: "actions",
    align: "right",
    render: () => (
      <Space>
        <Button icon={<EditOutlined />} disabled />
      </Space>
    ),
  },
];

export default function BudgetCategoriesTable({ categories }) {
  const size = useResponsiveValue("medium", "small");

  const dataSource = useMemo(
    () =>
      categories
        .sort(sortByProperty("label"))
        .map((category) => ({ ...category, key: category.id })),
    [categories]
  );

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      size={size}
      scroll={{ x: true }}
      pagination={false}
      locale={{
        emptyText: "No categories",
      }}
    />
  );
}
