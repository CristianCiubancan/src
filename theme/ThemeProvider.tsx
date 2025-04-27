import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types/theme';
import { LayoutConfig } from './config/layout';
import { ShapeSystemConfig } from './config/shape';
import { StateSystemConfig } from './config/states';
import { lightTheme, darkTheme, themes } from './config/theme';
import {
  CompleteThemeConfig,
  createCompleteTheme,
  applyCompleteTheme,
} from './config/integrated-theme';
import { defaultLayoutConfig } from './config/layout';
import { defaultShapeSystemConfig } from './config/shape';
import {
  defaultLightStateSystemConfig,
  defaultDarkStateSystemConfig,
} from './config/states';
import { ThemeContext } from './ThemeContext';

// Theme provider props
interface ThemeProviderProps {
  children: React.ReactNode;
  initialMode?: ThemeMode;
  initialThemeId?: string;
  customLayouts?: Record<string, LayoutConfig>;
  customShapes?: Record<string, ShapeSystemConfig>;
  customStates?: Record<string, StateSystemConfig>;
}

// Theme provider component
const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = 'system',
  initialThemeId = 'light',
  customLayouts = {},
  customShapes = {},
  customStates = {},
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
    const states =
      customStates[themeId] ||
      (themeId.includes('Dark')
        ? defaultDarkStateSystemConfig
        : defaultLightStateSystemConfig);

    return createCompleteTheme(baseTheme, layout, shape, states);
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

    // Get layout, shape, and states configs
    const layout = customLayouts[effectiveThemeId] || defaultLayoutConfig;
    const shape = customShapes[effectiveThemeId] || defaultShapeSystemConfig;
    const states =
      customStates[effectiveThemeId] ||
      (effectiveThemeId.includes('Dark')
        ? defaultDarkStateSystemConfig
        : defaultLightStateSystemConfig);

    // Create and set the complete theme
    const newTheme = createCompleteTheme(baseTheme, layout, shape, states);
    setCurrentTheme(newTheme);

    // Apply theme to document
    applyCompleteTheme(newTheme);

    // Update data attribute for CSS selectors
    document.documentElement.setAttribute('data-theme', baseTheme.id);
    document.documentElement.setAttribute('data-theme-mode', themeMode);
  }, [
    themeMode,
    themeId,
    systemPrefersDark,
    customLayouts,
    customShapes,
    customStates,
  ]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeMode,
        setThemeMode,
        setThemeId,
        availableThemes: themes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
