// config/shape.ts
// Implementation of the border, radius, and shadow system

import {
  ShapeConfig,
  defaultShapeConfig,
  ShapeVariants,
  defaultShapeVariants,
} from '../types/shape';
import { Theme } from '../types/theme';

// Complete shape configuration that can be customized per theme
export interface ShapeSystemConfig {
  shape: ShapeConfig;
  variants: ShapeVariants;
}

// Default shape system configuration
export const defaultShapeSystemConfig: ShapeSystemConfig = {
  shape: defaultShapeConfig,
  variants: defaultShapeVariants,
};

export function generateShapeCssVars(
  config: ShapeSystemConfig
): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Convert border widths to CSS variables
  Object.entries(config.shape.borderWidths).forEach(([key, value]) => {
    cssVars[`--border-width-${key}`] = value;
  });

  // Convert border radius values to CSS variables
  Object.entries(config.shape.borderRadius).forEach(([key, value]) => {
    cssVars[`--radius-${key}`] = value;
  });

  // Convert shadows to CSS variables
  Object.entries(config.shape.shadows).forEach(([key, value]) => {
    cssVars[`--shadow-${key}`] = value;
  });

  // Convert shape variants to CSS variables
  Object.entries(config.variants).forEach(([key, value]) => {
    // For border widths
    if (key.includes('Border')) {
      cssVars[`--${key}`] =
        config.shape.borderWidths[value as keyof BorderWidths];
    }
    // For border radius
    else if (key.includes('Radius')) {
      cssVars[`--${key}`] =
        config.shape.borderRadius[value as keyof BorderRadius];
    }
    // For shadows/elevation
    else if (key.includes('Elevation')) {
      cssVars[`--${key}`] = config.shape.shadows[value as keyof Shadows];
    }
  });

  return cssVars;
}

// Apply shape CSS variables to an element
export function applyShapeToCssVars(
  config: ShapeSystemConfig,
  element: HTMLElement = document.documentElement
): void {
  const cssVars = generateShapeCssVars(config);

  Object.entries(cssVars).forEach(([prop, value]) => {
    element.style.setProperty(prop, value);
  });
}

// Integrate shape system with theme
export function extendThemeWithShape(
  theme: Theme,
  shapeConfig: ShapeSystemConfig = defaultShapeSystemConfig
): Theme & { shape: ShapeSystemConfig } {
  return {
    ...theme,
    shape: shapeConfig,
  };
}

// Helper to create a custom shape config
export function createCustomShape(
  options: Partial<ShapeSystemConfig> = {}
): ShapeSystemConfig {
  return {
    shape: options.shape || defaultShapeConfig,
    variants: options.variants || defaultShapeVariants,
  };
}

// Helper to create component styles with borders
export function createBorderedComponent(
  borderWidth: keyof ShapeConfig['borderWidths'],
  borderRadius: keyof ShapeConfig['borderRadius'],
  config: ShapeSystemConfig = defaultShapeSystemConfig
): Record<string, string> {
  return {
    borderWidth: config.shape.borderWidths[borderWidth],
    borderStyle: 'solid',
    borderRadius: config.shape.borderRadius[borderRadius],
  };
}

// Helper to create component styles with elevation/shadow
export function createElevatedComponent(
  shadowLevel: keyof ShapeConfig['shadows'],
  config: ShapeSystemConfig = defaultShapeSystemConfig
): Record<string, string> {
  return {
    boxShadow: config.shape.shadows[shadowLevel],
  };
}

// Generate utility classes for border widths
export function createBorderWidthUtilities(
  config: ShapeSystemConfig = defaultShapeSystemConfig
): Record<string, Record<string, string>> {
  const utilities: Record<string, Record<string, string>> = {
    borderWidth: {},
    borderTopWidth: {},
    borderRightWidth: {},
    borderBottomWidth: {},
    borderLeftWidth: {},
  };

  // Generate all border width variations
  Object.entries(config.shape.borderWidths).forEach(([key, value]) => {
    utilities.borderWidth[`border-${key}`] = value;
    utilities.borderTopWidth[`border-t-${key}`] = value;
    utilities.borderRightWidth[`border-r-${key}`] = value;
    utilities.borderBottomWidth[`border-b-${key}`] = value;
    utilities.borderLeftWidth[`border-l-${key}`] = value;
  });

  return utilities;
}

// Generate utility classes for border radius
export function createBorderRadiusUtilities(
  config: ShapeSystemConfig = defaultShapeSystemConfig
): Record<string, Record<string, string>> {
  const utilities: Record<string, Record<string, string>> = {
    borderRadius: {},
    borderTopLeftRadius: {},
    borderTopRightRadius: {},
    borderBottomLeftRadius: {},
    borderBottomRightRadius: {},
  };

  // Generate all border radius variations
  Object.entries(config.shape.borderRadius).forEach(([key, value]) => {
    utilities.borderRadius[`rounded-${key}`] = value;
    utilities.borderTopLeftRadius[`rounded-tl-${key}`] = value;
    utilities.borderTopRightRadius[`rounded-tr-${key}`] = value;
    utilities.borderBottomLeftRadius[`rounded-bl-${key}`] = value;
    utilities.borderBottomRightRadius[`rounded-br-${key}`] = value;
  });

  return utilities;
}

// Generate utility classes for shadows
export function createShadowUtilities(
  config: ShapeSystemConfig = defaultShapeSystemConfig
): Record<string, Record<string, string>> {
  const utilities: Record<string, string> = {};

  // Generate all shadow variations
  Object.entries(config.shape.shadows).forEach(([key, value]) => {
    utilities[`shadow-${key}`] = value;
  });

  return { boxShadow: utilities };
}

// Adjust shadow color based on theme
export function getThemedShadow(
  shadowLevel: keyof ShapeConfig['shadows'],
  color: string,
  opacity: number = 0.2,
  config: ShapeSystemConfig = defaultShapeSystemConfig
): string {
  // Extract the shadow pattern without the color
  let shadow = config.shape.shadows[shadowLevel];

  // Replace rgba or hex color with the provided color
  const rgbaRegex = /rgba\([^)]+\)/g;
  const hexRegex = /#[0-9a-fA-F]{3,8}/g;

  // Create the new rgba color
  const rgbaColor = `rgba(${hexToRgb(color)}, ${opacity})`;

  if (rgbaRegex.test(shadow)) {
    shadow = shadow.replace(rgbaRegex, rgbaColor);
  } else if (hexRegex.test(shadow)) {
    shadow = shadow.replace(hexRegex, rgbaColor);
  }

  return shadow;
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
