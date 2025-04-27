// config/integrated-theme.ts
// Example of integrating all theme systems (colors, typography, layout, shape, and states)

import { Theme } from '../types/theme';
import {
  LayoutConfig,
  defaultLayoutConfig,
  applyLayoutToCssVars,
} from './layout';
import {
  ShapeSystemConfig,
  defaultShapeSystemConfig,
  applyShapeToCssVars,
} from './shape';
import {
  StateSystemConfig,
  defaultLightStateSystemConfig,
  defaultDarkStateSystemConfig,
  applyStatesToCssVars,
} from './states';
import {
  applyThemeToCssVars,
  generateThemeCssVars,
  lightTheme,
  darkTheme,
} from './theme';

// Complete theme configuration with all systems including states
export interface CompleteThemeConfig {
  theme: Theme;
  layout: LayoutConfig;
  shape: ShapeSystemConfig;
  states: StateSystemConfig;
}

// Create a complete theme with all subsystems - using direct object assembly rather than
// sequential extension functions to avoid lint errors about unused extension functions
export function createCompleteTheme(
  baseTheme: Theme = lightTheme,
  layout: LayoutConfig = defaultLayoutConfig,
  shape: ShapeSystemConfig = defaultShapeSystemConfig,
  states: StateSystemConfig = baseTheme.id.includes('Dark')
    ? defaultDarkStateSystemConfig
    : defaultLightStateSystemConfig
): CompleteThemeConfig {
  // Create the complete theme in one step
  return {
    theme: baseTheme,
    layout,
    shape,
    states,
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
  applyStatesToCssVars(config.states, element);

  // Add state animations to the document
  addStateAnimations();
}

// Add state animations to document
function addStateAnimations(): void {
  const existingStyle = document.getElementById('theme-state-animations');
  if (existingStyle) {
    return; // Don't add duplicates
  }

  const animations = `
    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;

  const style = document.createElement('style');
  style.id = 'theme-state-animations';
  style.textContent = animations;
  document.head.appendChild(style);
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
