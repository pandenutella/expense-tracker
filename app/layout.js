import { AuthContextProvider } from "@/contexts/AuthContext";
import { ConfigProvider, Layout } from "antd";

export const metadata = {
  title: "Expense Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#14ccb5",
              colorInfo: "#14ccb5",
            },
          }}
        >
          <AuthContextProvider>
            <Layout style={{ minHeight: "100vh" }}>{children}</Layout>
          </AuthContextProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
