import useResponsiveValue from "@/hooks/useResponsiveValue";
import { Table } from "antd";

const columns = [
  {
    key: "category",
    dataIndex: "category",
    title: "Category",
  },
  {
    key: "remaining",
    dataIndex: "remaining",
    title: "Remaining",
  },
  {
    key: "actions",
    align: "right",
  },
];

export default function BudgetTable() {
  const size = useResponsiveValue("medium", "small");

  return (
    <Table columns={columns} dataSource={[]} size={size} scroll={{ x: true }} />
  );
}
