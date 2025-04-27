import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from './types/theme';
import { ThemeMode } from './types/theme';
import { LayoutConfig } from './config/layout';
import { ShapeSystemConfig } from './config/shape';
import { lightTheme, darkTheme, themes, getThemeByMode } from './config/theme';
import {
  CompleteThemeConfig,
  createCompleteTheme,
  applyCompleteTheme,
} from './config/integrated-theme';
import { defaultLayoutConfig } from './config/layout';
import { defaultShapeSystemConfig } from './config/shape';

// Theme context interface
interface ThemeContextType {
  currentTheme: CompleteThemeConfig;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  setThemeId: (id: string) => void;
  availableThemes: Record<string, Theme>;
}

// Create the theme context with default values
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: createCompleteTheme(lightTheme),
  themeMode: 'light',
  setThemeMode: () => {},
  setThemeId: () => {},
  availableThemes: themes,
});

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider props
interface ThemeProviderProps {
  children: React.ReactNode;
  initialMode?: ThemeMode;
  initialThemeId?: string;
  customLayouts?: Record<string, LayoutConfig>;
  customShapes?: Record<string, ShapeSystemConfig>;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = 'system',
  initialThemeId = 'light',
  customLayouts = {},
  customShapes = {},
}) => {
  // Check system preference
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Theme state
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialMode);
  const [themeId, setThemeId] = useState<string>(initialThemeId);

  // Current theme state
  const [currentTheme, setCurrentTheme] = useState<CompleteThemeConfig>(() => {
    const baseTheme = themeId in themes ? themes[themeId] : lightTheme;
    const layout = customLayouts[themeId] || defaultLayoutConfig;
    const shape = customShapes[themeId] || defaultShapeSystemConfig;
    return createCompleteTheme(baseTheme, layout, shape);
  });

  // Listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    // Add listener for modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    return undefined;
  }, []);

  // Update theme when mode or system preference changes
  useEffect(() => {
    let effectiveThemeId = themeId;

    // Handle system theme mode
    if (themeMode === 'system') {
      effectiveThemeId = systemPrefersDark ? 'dark' : 'light';
    } else if (themeMode === 'dark') {
      effectiveThemeId = themeId.endsWith('Dark') ? themeId : 'dark';
    } else if (themeMode === 'light') {
      effectiveThemeId = themeId.endsWith('Dark')
        ? themeId.replace('Dark', '')
        : themeId;
    }

    // Get the base theme
    const baseTheme =
      effectiveThemeId in themes
        ? themes[effectiveThemeId]
        : themeMode === 'dark'
        ? darkTheme
        : lightTheme;

    // Get layout and shape configs
    const layout = customLayouts[effectiveThemeId] || defaultLayoutConfig;
    const shape = customShapes[effectiveThemeId] || defaultShapeSystemConfig;

    // Create and set the complete theme
    const newTheme = createCompleteTheme(baseTheme, layout, shape);
    setCurrentTheme(newTheme);

    // Apply theme to document
    applyCompleteTheme(newTheme);

    // Update data attribute for CSS selectors
    document.documentElement.setAttribute('data-theme', baseTheme.id);
    document.documentElement.setAttribute('data-theme-mode', themeMode);
  }, [themeMode, themeId, systemPrefersDark, customLayouts, customShapes]);

  // Create context value
  const contextValue: ThemeContextType = {
    currentTheme,
    themeMode,
    setThemeMode,
    setThemeId,
    availableThemes: themes,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export the Provider component as default
export default ThemeProvider;
