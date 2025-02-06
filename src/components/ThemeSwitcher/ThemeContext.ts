import { createContext } from 'react';
import { ThemeContextProps } from '@/types/ThemeContext.types';

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);