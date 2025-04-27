// types/shape.ts
// Defines border widths, styles, radius values, and shadow system

// Border width options
export interface BorderWidths {
  none: string;
  thin: string;
  light: string;
  normal: string;
  medium: string;
  thick: string;
  heavy: string;
}

// Default border width values
export const defaultBorderWidths: BorderWidths = {
  none: '0px',
  thin: '1px',
  light: '2px',
  normal: '3px',
  medium: '4px',
  thick: '6px',
  heavy: '8px',
};

// Border style options
export type BorderStyle =
  | 'none'
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset';

// Border radius (roundness)
export interface BorderRadius {
  none: string;
  xs: string; // Extra small
  sm: string; // Small
  md: string; // Medium
  lg: string; // Large
  xl: string; // Extra large
  '2xl': string; // 2x large
  '3xl': string; // 3x large
  full: string; // Fully rounded (circle)
}

// Default border radius values
export const defaultBorderRadius: BorderRadius = {
  none: '0px',
  xs: '0.125rem', // 2px
  sm: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px', // Circle/pill
};

// Shadow (elevation) levels
export interface Shadows {
  none: string;
  xs: string; // Extra small
  sm: string; // Small
  md: string; // Medium
  lg: string; // Large
  xl: string; // Extra large
  '2xl': string; // 2x large
  '3xl': string; // 3x large
  inner: string; // Inner shadow
  outline: string; // Focus outline
}

// Default shadow values
export const defaultShadows: Shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  outline: '0 0 0 3px rgba(59, 130, 246, 0.5)', // Uses primary blue by default
};

// Complete shape configuration
export interface ShapeConfig {
  borderWidths: BorderWidths;
  borderRadius: BorderRadius;
  shadows: Shadows;
}

// Default shape configuration
export const defaultShapeConfig: ShapeConfig = {
  borderWidths: defaultBorderWidths,
  borderRadius: defaultBorderRadius,
  shadows: defaultShadows,
};

// Semantic shape variants
export interface ShapeVariants {
  // Button shape variants
  buttonRadius: keyof BorderRadius;
  buttonElevation: keyof Shadows;

  // Card shape variants
  cardRadius: keyof BorderRadius;
  cardElevation: keyof Shadows;
  cardBorder: keyof BorderWidths;

  // Input shape variants
  inputRadius: keyof BorderRadius;
  inputBorder: keyof BorderWidths;

  // Dialog/modal shape variants
  dialogRadius: keyof BorderRadius;
  dialogElevation: keyof Shadows;

  // Menu/dropdown shape variants
  menuRadius: keyof BorderRadius;
  menuElevation: keyof Shadows;

  // Tooltip shape variants
  tooltipRadius: keyof BorderRadius;
  tooltipElevation: keyof Shadows;
}

// Default shape variants
export const defaultShapeVariants: ShapeVariants = {
  buttonRadius: 'md',
  buttonElevation: 'sm',

  cardRadius: 'lg',
  cardElevation: 'md',
  cardBorder: 'none',

  inputRadius: 'md',
  inputBorder: 'light',

  dialogRadius: 'lg',
  dialogElevation: 'xl',

  menuRadius: 'md',
  menuElevation: 'lg',

  tooltipRadius: 'sm',
  tooltipElevation: 'sm',
};
