import Header from "@/components/Header";
import { Content } from "antd/es/layout/layout";

export default function AppLayout({ children }) {
  return (
    <>
      <Header />
      <Content style={{ padding: 20 }}>{children}</Content>
    </>
  );
}
