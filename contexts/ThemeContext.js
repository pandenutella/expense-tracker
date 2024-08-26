"use client";

import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

const MODE_THEME_KEY = "theme.mode";

const getStoredThemeMode = () => {
  let mode = localStorage.getItem(MODE_THEME_KEY);
  if (!mode) {
    mode = "light";
    localStorage.setItem("theme.mode", mode);

    return mode;
  }

  return mode;
};

export const ThemeContextProvider = ({ children }) => {
  const storedThemeMode = getStoredThemeMode();
  const [mode, setMode] = useState(storedThemeMode);

  const setModeExternal = (mode) => {
    localStorage.setItem("theme.mode", mode);
    setMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode: setModeExternal }}>
      {children}
    </ThemeContext.Provider>
  );
};
