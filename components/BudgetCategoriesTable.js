import useResponsiveValue from "@/hooks/useResponsiveValue";
import { sortByProperty } from "@/utilities/array.utility";
import { Table } from "antd";
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
    key: "remaining",
    dataIndex: "remaining",
    title: "Remaining",
    render: (remaining) => phPeso.format(remaining),
    align: "right",
  },
  {
    key: "actions",
    align: "right",
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
    />
  );
}
