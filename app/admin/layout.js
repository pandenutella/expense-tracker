import Header from "@/components/Header";
import { Content as LayoutContent } from "antd/es/layout/layout";

export default function AdminLayout({ children }) {
  return (
    <>
      <Header />
      <LayoutContent>{children}</LayoutContent>
    </>
  );
}
