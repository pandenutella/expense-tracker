import { Grid } from "antd";

export default function useResponsiveValue(desktop, mobile) {
  const { sm } = Grid.useBreakpoint();

  return sm ? desktop : mobile;
}
