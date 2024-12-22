import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ThemeContext = createContext();

export default function CustomThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });

  const value = useMemo(
    () => ({ isDark, toggleDarkMode }),
    [isDark, toggleDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a Provider");
  return context;
};