// config/states.ts
// Implementation of the component state system

import { Theme } from '../types/theme';
import {
  ComponentState,
  ComponentStateOverrides,
  defaultLightComponentStates,
  defaultDarkComponentStates,
  InteractiveStates,
  FeedbackStates,
  InteractiveStateStyles,
  FeedbackStateStyles,
} from '../types/states';

// Complete state configuration that can be customized per theme
export interface StateSystemConfig {
  baseStates: ComponentState;
  componentOverrides: ComponentStateOverrides;
}

// Default state system configuration for light mode
export const defaultLightStateSystemConfig: StateSystemConfig = {
  baseStates: defaultLightComponentStates,
  componentOverrides: {
    // Button-specific state overrides
    button: {
      interactive: {
        hover: {
          backgroundColor: 'var(--color-primaryHover)',
          textColor: 'white',
        },
        active: {
          backgroundColor: 'var(--color-primaryActive)',
          transform: 'scale(0.98)',
        },
        disabled: {
          backgroundColor: 'var(--color-backgroundMuted)',
          textColor: 'var(--color-textMuted)',
          cursor: 'not-allowed',
          opacity: '0.65',
        },
      },
    },
    // Input-specific state overrides
    input: {
      interactive: {
        focus: {
          borderColor: 'var(--color-primary)',
          boxShadow: '0 0 0 3px var(--color-primaryOutline)',
        },
        disabled: {
          backgroundColor: 'var(--color-backgroundMuted)',
          opacity: '0.6',
        },
      },
      feedback: {
        error: {
          borderColor: 'var(--color-error)',
          boxShadow: '0 0 0 3px var(--color-errorSubtle)',
        },
      },
    },
    // Link-specific state overrides
    link: {
      interactive: {
        default: {
          textDecoration: 'none',
          color: 'var(--color-primary)',
        },
        hover: {
          textDecoration: 'underline',
          color: 'var(--color-primaryHover)',
        },
        visited: {
          color: 'var(--color-secondary)',
        },
      },
    },
  },
};

// Default state system configuration for dark mode
export const defaultDarkStateSystemConfig: StateSystemConfig = {
  baseStates: defaultDarkComponentStates,
  componentOverrides: {
    // Dark theme button-specific state overrides
    button: {
      interactive: {
        hover: {
          backgroundColor: 'var(--color-primaryHover)',
          textColor: 'white',
        },
        active: {
          backgroundColor: 'var(--color-primaryActive)',
          transform: 'scale(0.98)',
        },
        disabled: {
          backgroundColor: 'var(--color-backgroundMuted)',
          textColor: 'var(--color-textMuted)',
          cursor: 'not-allowed',
          opacity: '0.65',
        },
      },
    },
    // Other component overrides as needed
    // (similar pattern to light theme)
  },
};

// Generate CSS variables for interactive states
export function generateInteractiveStatesCssVars(
  states: InteractiveStates,
  prefix: string = 'state'
): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Process each state
  Object.entries(states).forEach(([stateName, stateStyles]) => {
    // Process each style property within a state
    Object.entries(stateStyles as InteractiveStateStyles).forEach(
      ([prop, value]) => {
        if (value) {
          cssVars[`--${prefix}-${stateName}-${prop}`] = value;
        }
      }
    );
  });

  return cssVars;
}

// Generate CSS variables for feedback states
export function generateFeedbackStatesCssVars(
  states: FeedbackStates,
  prefix: string = 'state'
): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Process each state
  Object.entries(states).forEach(([stateName, stateStyles]) => {
    // Process each style property within a state
    Object.entries(stateStyles as FeedbackStateStyles).forEach(
      ([prop, value]) => {
        if (value) {
          cssVars[`--${prefix}-${stateName}-${prop}`] = value;
        }
      }
    );
  });

  return cssVars;
}

// Apply state CSS variables to an element
export function applyStatesToCssVars(
  config: StateSystemConfig,
  element: HTMLElement = document.documentElement
): void {
  // Process base states
  const baseInteractiveVars = generateInteractiveStatesCssVars(
    config.baseStates.interactive
  );
  const baseFeedbackVars = generateFeedbackStatesCssVars(
    config.baseStates.feedback
  );

  // Apply base state variables
  Object.entries({ ...baseInteractiveVars, ...baseFeedbackVars }).forEach(
    ([prop, value]) => {
      element.style.setProperty(prop, value);
    }
  );

  // Process component-specific overrides
  Object.entries(config.componentOverrides).forEach(([component, states]) => {
    // Process interactive states if present
    if (states.interactive) {
      const interactiveVars = generateInteractiveStatesCssVars(
        states.interactive as InteractiveStates,
        `${component}-state`
      );

      Object.entries(interactiveVars).forEach(([prop, value]) => {
        element.style.setProperty(prop, value);
      });
    }

    // Process feedback states if present
    if (states.feedback) {
      const feedbackVars = generateFeedbackStatesCssVars(
        states.feedback as FeedbackStates,
        `${component}-state`
      );

      Object.entries(feedbackVars).forEach(([prop, value]) => {
        element.style.setProperty(prop, value);
      });
    }
  });
}

// Integrate states with theme system
export function extendThemeWithStates(
  theme: Theme,
  stateConfig: StateSystemConfig = theme.id.includes('Dark')
    ? defaultDarkStateSystemConfig
    : defaultLightStateSystemConfig
): Theme & { states: StateSystemConfig } {
  return {
    ...theme,
    states: stateConfig,
  };
}

// Get state styles for a specific component
export function getComponentStateStyles(
  config: StateSystemConfig,
  componentName: keyof ComponentStateOverrides
): ComponentState {
  const componentOverride = config.componentOverrides[componentName];

  if (!componentOverride) {
    return config.baseStates;
  }

  // Deep merge base states with component-specific overrides
  return {
    interactive: {
      ...config.baseStates.interactive,
      ...(componentOverride.interactive || {}),
    },
    feedback: {
      ...config.baseStates.feedback,
      ...(componentOverride.feedback || {}),
    },
  };
}

// Helper function to generate CSS for states
export function createStateStyles(
  state: keyof InteractiveStates,
  componentName?: keyof ComponentStateOverrides
): Record<string, string> {
  const prefix = componentName ? `--${componentName}-state` : '--state';
  const styles: Record<string, string> = {};

  // Add all potential style properties
  const properties = [
    'backgroundColor',
    'textColor',
    'borderColor',
    'borderWidth',
    'boxShadow',
    'transform',
    'opacity',
    'cursor',
    'transition',
    'outline',
    'textDecoration',
  ];

  properties.forEach((prop) => {
    // Use CSS variable with fallback
    styles[
      cssNameToProp(prop)
    ] = `var(${prefix}-${state}-${prop}, var(--state-${state}-${prop}, initial))`;
  });

  return styles;
}

// Helper to convert CSS variable names to CSS properties
function cssNameToProp(name: string): string {
  // Handle special cases
  if (name === 'textColor') return 'color';

  // Convert camelCase to kebab-case
  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
}

// Animation keyframes for feedback states
export const stateAnimations = {
  pulse: `
    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
  `,
  shake: `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `,
  spin: `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
};
