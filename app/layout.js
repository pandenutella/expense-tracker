import { AuthContextProvider } from "@/contexts/AuthContext";
import { CustomConfigProvider } from "@/contexts/CustomConfigContext";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { Layout } from "antd";

export const metadata = {
  title: "Expense Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ThemeContextProvider>
          <CustomConfigProvider>
            <AuthContextProvider>
              <Layout style={{ minHeight: "100vh" }}>{children}</Layout>
            </AuthContextProvider>
          </CustomConfigProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
