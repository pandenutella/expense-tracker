import { AccountsContextProvider } from "@/contexts/AccountsContext";

export default function AccountsLayout({ children }) {
  return <AccountsContextProvider>{children}</AccountsContextProvider>;
}
