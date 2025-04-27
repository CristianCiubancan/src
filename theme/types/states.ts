// types/states.ts
// Defines interactive states and feedback states for components

// Interactive states for components
export interface InteractiveStates {
  // Basic states
  default: InteractiveStateStyles;
  hover: InteractiveStateStyles;
  focus: InteractiveStateStyles;
  active: InteractiveStateStyles;
  disabled: InteractiveStateStyles;

  // Combined states
  hoverActive: InteractiveStateStyles; // When hovering and active simultaneously
  focusVisible: InteractiveStateStyles; // Focus visible (keyboard focus)

  // Optional states
  pressed?: InteractiveStateStyles; // For toggle components
  selected?: InteractiveStateStyles; // For selection components
  visited?: InteractiveStateStyles; // For links
}

// Feedback states for components
export interface FeedbackStates {
  idle: FeedbackStateStyles;
  loading: FeedbackStateStyles;
  success: FeedbackStateStyles;
  error: FeedbackStateStyles;
  warning: FeedbackStateStyles;
  info: FeedbackStateStyles;
}

// Styles that can be applied for each interactive state
export interface InteractiveStateStyles {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: string;
  boxShadow?: string;
  transform?: string;
  opacity?: string;
  cursor?: string;
  transition?: string;
  outline?: string;
  textDecoration?: string;
  outlineOffset?: string;
  // Add any other CSS properties needed
}

// In theme/types/states.ts, update the FeedbackStateStyles interface:
export interface FeedbackStateStyles {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  boxShadow?: string;
  icon?: string;
  message?: string;
  animation?: string;
  opacity?: string; // Add opacity to allowed properties
  cursor?: string;
  // Add any other CSS properties needed
}

// Type for component states
export interface ComponentState {
  interactive: InteractiveStates;
  feedback: FeedbackStates;
}

// Default interactive states (light theme)
export const defaultLightInteractiveStates: InteractiveStates = {
  default: {
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  hover: {
    backgroundColor: 'var(--color-primarySubtle)',
    textDecoration: 'none',
  },
  focus: {
    outline: '2px solid var(--color-borderFocus)',
    outlineOffset: '2px',
  },
  focusVisible: {
    outline: '2px solid var(--color-primary)',
    outlineOffset: '2px',
    boxShadow: '0 0 0 4px var(--color-primaryOutline)',
  },
  active: {
    transform: 'translateY(1px)',
    backgroundColor: 'var(--color-primaryActive)',
  },
  hoverActive: {
    backgroundColor: 'var(--color-primaryActive)',
    transform: 'translateY(1px)',
  },
  disabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
    backgroundColor: 'var(--color-backgroundMuted)',
  },
};

// Default interactive states (dark theme)
export const defaultDarkInteractiveStates: InteractiveStates = {
  // Inherit most styles from light theme
  ...defaultLightInteractiveStates,
  // Override specific styles for dark theme
  hover: {
    backgroundColor: 'var(--color-primarySubtle)',
    textDecoration: 'none',
  },
  disabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
    backgroundColor: 'var(--color-backgroundSubtle)',
  },
};

// Default feedback states (light theme)
export const defaultLightFeedbackStates: FeedbackStates = {
  idle: {
    backgroundColor: 'transparent',
  },
  loading: {
    opacity: '0.8',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  success: {
    backgroundColor: 'var(--color-successSubtle)',
    borderColor: 'var(--color-success)',
    textColor: 'var(--color-success)',
    icon: 'check-circle',
  },
  error: {
    backgroundColor: 'var(--color-errorSubtle)',
    borderColor: 'var(--color-error)',
    textColor: 'var(--color-error)',
    icon: 'alert-circle',
  },
  warning: {
    backgroundColor: 'var(--color-warningSubtle)',
    borderColor: 'var(--color-warning)',
    textColor: 'var(--color-warning)',
    icon: 'alert-triangle',
  },
  info: {
    backgroundColor: 'var(--color-infoSubtle)',
    borderColor: 'var(--color-info)',
    textColor: 'var(--color-info)',
    icon: 'info',
  },
};

// Default feedback states (dark theme)
export const defaultDarkFeedbackStates: FeedbackStates = {
  // Inherit from light theme
  ...defaultLightFeedbackStates,
  // No need to override if design is consistent between light/dark
};

// Default component states for light theme
export const defaultLightComponentStates: ComponentState = {
  interactive: defaultLightInteractiveStates,
  feedback: defaultLightFeedbackStates,
};

// Default component states for dark theme
export const defaultDarkComponentStates: ComponentState = {
  interactive: defaultDarkInteractiveStates,
  feedback: defaultDarkFeedbackStates,
};

// Map of component-specific state overrides
export interface ComponentStateOverrides {
  button?: Partial<ComponentState>;
  input?: Partial<ComponentState>;
  link?: Partial<ComponentState>;
  switch?: Partial<ComponentState>;
  checkbox?: Partial<ComponentState>;
  radio?: Partial<ComponentState>;
  card?: Partial<ComponentState>;
  // Add other components as needed
}
