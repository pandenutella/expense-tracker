"use client";

import useResponsiveValue from "@/hooks/useResponsiveValue";
import { Layout } from "antd";
import NavigationMenu from "./NavigationMenu";

export default function Sider() {
  const desktop = useResponsiveValue(true, false);

  if (desktop) {
    return (
      <Layout.Sider collapsible theme="light">
        <NavigationMenu mode="inline" />
      </Layout.Sider>
    );
  }

  return (
    <Layout.Footer
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        padding: 0,
        zIndex: 1,
        borderTopColor: "rgb(240, 240, 240)",
        borderTopStyle: "solid",
        borderTopWidth: 0.8,
      }}
    >
      <NavigationMenu mode="horizontal" />
    </Layout.Footer>
  );
}
