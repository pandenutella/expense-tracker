"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { Spin } from "antd";
import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const { get: getStoredMode, set: setStoredMode } =
    useLocalStorage("theme.mode");
  const [mode, setMode] = useState();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const storedMode = getStoredMode();
    if (!storedMode) {
      const initialMode = "light";

      setStoredMode(initialMode);
      setMode(initialMode);
    } else {
      setMode(storedMode);
    }

    setInitializing(false);
  }, []);

  const setModeExternal = (mode) => {
    setStoredMode(mode);
    setMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode: setModeExternal }}>
      {initializing ? <Spin /> : children}
    </ThemeContext.Provider>
  );
};
