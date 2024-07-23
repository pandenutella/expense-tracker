import { AuthContextProvider } from "@/contexts/AuthContext";
import { Layout } from "antd";

export const metadata = {
  title: "Expense Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AuthContextProvider>
          <Layout style={{ minHeight: "100vh" }}>{children}</Layout>
        </AuthContextProvider>
      </body>
    </html>
  );
}
