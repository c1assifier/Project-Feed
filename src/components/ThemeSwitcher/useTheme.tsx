import { useContext } from "react";
import { ThemeContextProps } from "@/types/ThemeContext.types";
import { ThemeContext } from "./ThemeContext";

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme должен использоваться внутри ThemeProvider');
  }
  return context;
};