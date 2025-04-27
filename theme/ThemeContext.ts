import { createContext } from 'react';
import { Theme, ThemeMode } from './types/theme';
import {
  CompleteThemeConfig,
  createCompleteTheme,
} from './config/integrated-theme';
import { lightTheme, themes } from './config/theme';

// Theme context interface
export interface ThemeContextType {
  currentTheme: CompleteThemeConfig;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  setThemeId: (id: string) => void;
  availableThemes: Record<string, Theme>;
}

// Create the theme context with default values
export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: createCompleteTheme(lightTheme),
  themeMode: 'light',
  setThemeMode: () => {},
  setThemeId: () => {},
  availableThemes: themes,
});
