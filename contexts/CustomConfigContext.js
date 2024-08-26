"use client";

import { ConfigProvider, theme } from "antd";
import { useThemeContext } from "./ThemeContext";

const getAlgorithm = (mode) => {
  switch (mode) {
    case "dark":
      return theme.darkAlgorithm;
    case "light":
    default:
      return theme.defaultAlgorithm;
  }
};

export const CustomConfigProvider = ({ children }) => {
  const { mode } = useThemeContext();

  const algorithm = getAlgorithm(mode);

  return (
    <ConfigProvider
      theme={{
        algorithm,
        token: {
          colorPrimary: "#14ccb5",
          colorInfo: "#14ccb5",
        },
        components: {
          Layout: {
            headerBg: "#ffffff00",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
