// config/integrated-theme.ts
// Example of integrating all theme systems (colors, typography, layout, shape)

import { Theme } from '../types/theme';
import {
  LayoutConfig,
  defaultLayoutConfig,
  extendThemeWithLayout,
} from './layout';
import {
  ShapeSystemConfig,
  defaultShapeSystemConfig,
  extendThemeWithShape,
} from './shape';
import {
  applyThemeToCssVars,
  generateThemeCssVars,
  lightTheme,
  darkTheme,
} from './theme';
import { applyLayoutToCssVars } from './layout';
import { applyShapeToCssVars } from './shape';

// Complete theme configuration with all systems
export interface CompleteThemeConfig {
  theme: Theme;
  layout: LayoutConfig;
  shape: ShapeSystemConfig;
}

// Create a complete theme with all subsystems
export function createCompleteTheme(
  baseTheme: Theme = lightTheme,
  layout: LayoutConfig = defaultLayoutConfig,
  shape: ShapeSystemConfig = defaultShapeSystemConfig
): CompleteThemeConfig {
  // Extend the base theme with layout and shape
  const themeWithLayout = extendThemeWithLayout(baseTheme, layout);
  const completeTheme = extendThemeWithShape(themeWithLayout, shape);

  return {
    theme: completeTheme,
    layout,
    shape,
  };
}

// Default light complete theme
export const lightCompleteTheme = createCompleteTheme(lightTheme);

// Default dark complete theme
export const darkCompleteTheme = createCompleteTheme(darkTheme);

// Apply a complete theme to the document
export function applyCompleteTheme(
  config: CompleteThemeConfig,
  element: HTMLElement = document.documentElement
): void {
  // Apply all CSS variables from each system
  applyThemeToCssVars(config.theme, element);
  applyLayoutToCssVars(config.layout, element);
  applyShapeToCssVars(config.shape, element);
}

// Generate all CSS variables for a theme
export function generateAllCssVars(
  config: CompleteThemeConfig
): Record<string, string> {
  return {
    ...generateThemeCssVars(config.theme),
    // Add other variable generators here
  };
}

// Create themed shadow with primary color
export function getPrimaryShadow(
  theme: Theme,
  level: keyof ShapeSystemConfig['shape']['shadows'] = 'md',
  opacity: number = 0.2
): string {
  const shadowBase = defaultShapeSystemConfig.shape.shadows[level];
  return shadowBase.replace(
    /rgba\([^)]+\)/g,
    `rgba(${hexToRgb(theme.colors.primary)}, ${opacity})`
  );
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

// Example theme initialization function
export function initializeTheme(
  isDarkMode: boolean = false,
  customConfig?: Partial<CompleteThemeConfig>
): void {
  // Start with the appropriate default theme
  const baseConfig = isDarkMode ? darkCompleteTheme : lightCompleteTheme;

  // Merge with any custom configuration
  const config = customConfig ? { ...baseConfig, ...customConfig } : baseConfig;

  // Apply the theme to the document
  applyCompleteTheme(config);

  // Set a data attribute on the HTML element for CSS selectors
  document.documentElement.setAttribute(
    'data-theme',
    isDarkMode ? 'dark' : 'light'
  );
}
