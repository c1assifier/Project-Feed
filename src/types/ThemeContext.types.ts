import { ReactNode } from "react";

export type Theme = 'light' | 'dark';

export interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}