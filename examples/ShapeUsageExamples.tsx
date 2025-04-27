import React, { useState } from 'react';

// Button component with state management
export const StatefulButton: React.FC<{
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'loading' | 'success' | 'error';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({
  children,
  variant = 'solid',
  size = 'md',
  state = 'default',
  disabled = false,
  onClick,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Base styles
  const baseStyles = `
    font-medium
    inline-flex
    items-center
    justify-center
    transition-all
    duration-200
    relative
    focus:outline-none
  `;

  // Size styles
  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1.5 text-sm';
      break;
    case 'lg':
      sizeStyles = 'px-6 py-3 text-lg';
      break;
    default:
      sizeStyles = 'px-4 py-2 text-base';
  }

  // Variant styles
  let variantStyles = '';
  switch (variant) {
    case 'outline':
      variantStyles = `
        bg-transparent
        border border-width-light border-primary
        text-primary
      `;
      break;
    case 'ghost':
      variantStyles = `
        bg-transparent
        border-none
        text-primary
      `;
      break;
    default:
      variantStyles = `
        bg-primary
        border-none
        text-white
        shadow-sm
      `;
  }

  // State styles
  let stateStyles = '';
  let stateIcon = null;

  switch (state) {
    case 'loading':
      stateStyles = `
        opacity-80
        cursor-wait
      `;
      stateIcon = (
        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      );
      break;
    case 'success':
      stateStyles = `
        ${
          variant === 'solid'
            ? 'bg-success text-white'
            : 'text-success border-success'
        }
      `;
      stateIcon = (
        <span className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      );
      break;
    case 'error':
      stateStyles = `
        ${
          variant === 'solid'
            ? 'bg-error text-white'
            : 'text-error border-error'
        }
      `;
      stateIcon = (
        <span className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1
            0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      );
      break;
  }

  // Interactive state styles
  let interactiveStyles = '';

  if (disabled) {
    interactiveStyles = `
      opacity-60
      cursor-not-allowed
      bg-backgroundMuted
      text-textMuted
      border-border
      pointer-events-none
    `;
  } else {
    if (isActive && !disabled) {
      interactiveStyles = `
        transform scale-98
        ${variant === 'solid' ? 'bg-primaryActive' : 'bg-primarySubtle'}
      `;
    } else if (isHovered && !disabled) {
      interactiveStyles = `
        ${variant === 'solid' ? 'bg-primaryHover' : 'bg-primarySubtle'}
      `;
    }

    if (isFocused && !disabled) {
      interactiveStyles += `
        outline
        outline-2
        outline-primaryOutline
        outline-offset-2
      `;
    }
  }

  // Combine styles
  const styles = `
    ${baseStyles}
    ${sizeStyles}
    ${variantStyles}
    ${stateStyles}
    ${interactiveStyles}
    ${className}
  `;

  // Handle the loading state content
  const buttonContent =
    state === 'loading' ? (
      <>
        <span className="opacity-0">{children}</span>
        {stateIcon}
      </>
    ) : (
      <>
        {stateIcon}
        {children}
      </>
    );

  return (
    <button
      className={styles}
      onClick={onClick}
      disabled={disabled || state === 'loading'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {buttonContent}
    </button>
  );
};

// Input field with state management
export const StatefulInput: React.FC<{
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state?: 'default' | 'loading' | 'success' | 'error';
  disabled?: boolean;
  helperText?: string;
  className?: string;
}> = ({
  placeholder,
  value,
  onChange,
  state = 'default',
  disabled = false,
  helperText,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Base styles
  const baseStyles = `
    w-full
    px-4
    py-2
    bg-background
    border border-width-light border-border
    transition-all
    duration-200
    rounded-md
  `;

  // State styles
  let stateStyles = '';
  let stateIcon = null;
  let helperTextColor = 'text-textSecondary';

  switch (state) {
    case 'loading':
      stateStyles = `
        pr-10
      `;
      stateIcon = (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg
            className="animate-spin h-5 w-5 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      );
      break;
    case 'success':
      stateStyles = `
        border-success
        pr-10
      `;
      stateIcon = (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-success"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      );
      helperTextColor = 'text-success';
      break;
    case 'error':
      stateStyles = `
        border-error
        pr-10
      `;
      stateIcon = (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-error"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1
            0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      );
      helperTextColor = 'text-error';
      break;
  }

  // Interactive state styles
  let interactiveStyles = '';

  if (disabled) {
    interactiveStyles = `
      opacity-60
      cursor-not-allowed
      bg-backgroundMuted
      text-textMuted
      pointer-events-none
    `;
  } else if (isFocused) {
    interactiveStyles = `
      border-primary
      ring-1
      ring-primaryOutline
    `;
  }

  // Combine styles
  const styles = `
    ${baseStyles}
    ${stateStyles}
    ${interactiveStyles}
    ${className}
  `;

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={styles}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {stateIcon}
      {helperText && (
        <p className={`mt-1 text-sm ${helperTextColor}`}>{helperText}</p>
      )}
    </div>
  );
};

// Card with state management for interactive cards
export const StatefulCard: React.FC<{
  children: React.ReactNode;
  variant?: 'flat' | 'outlined' | 'elevated';
  interactive?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({
  children,
  variant = 'elevated',
  interactive = false,
  selected = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Base styles
  const baseStyles = `
    p-6
    overflow-hidden
    rounded-lg
    transition-all
    duration-200
  `;

  // Variant styles
  let variantStyles = '';
  switch (variant) {
    case 'flat':
      variantStyles = `
        bg-backgroundMuted
        border-none
      `;
      break;
    case 'outlined':
      variantStyles = `
        bg-background
        border border-width-light border-border
      `;
      break;
    default:
      variantStyles = `
        bg-background
        shadow-md
        border-none
      `;
  }

  // Interactive state styles
  let stateStyles = '';

  if (disabled) {
    stateStyles = `
      opacity-60
      cursor-not-allowed
      bg-backgroundMuted
      pointer-events-none
    `;
  } else if (interactive) {
    stateStyles = `
      cursor-pointer
    `;

    if (selected) {
      stateStyles += `
        border-2
        border-primary
      `;
    }

    if (isActive && !disabled) {
      stateStyles += `
        transform scale-99
        ${variant === 'elevated' ? 'shadow-sm' : ''}
      `;
    }

    if (isHovered && !disabled) {
      stateStyles += `
        ${variant === 'elevated' ? 'shadow-lg' : 'bg-backgroundSubtle'}
      `;
    }

    if (isFocused && !disabled) {
      stateStyles += `
        outline
        outline-2
        outline-primaryOutline
        outline-offset-2
      `;
    }
  }

  // Combine styles
  const styles = `
    ${baseStyles}
    ${variantStyles}
    ${stateStyles}
    ${className}
  `;

  return (
    <div
      className={styles}
      onClick={interactive && !disabled ? onClick : undefined}
      onMouseEnter={interactive ? () => setIsHovered(true) : undefined}
      onMouseLeave={interactive ? () => setIsHovered(false) : undefined}
      onMouseDown={interactive ? () => setIsActive(true) : undefined}
      onMouseUp={interactive ? () => setIsActive(false) : undefined}
      onFocus={interactive ? () => setIsFocused(true) : undefined}
      onBlur={interactive ? () => setIsFocused(false) : undefined}
      tabIndex={interactive && !disabled ? 0 : undefined}
      role={interactive ? 'button' : undefined}
    >
      {children}
    </div>
  );
};

// Demo component showcasing all the state examples
export const StateExamplesDemo: React.FC = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputState, setInputState] = useState<
    'default' | 'loading' | 'success' | 'error'
  >('default');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // Helper for button demo
  const handleButtonClick = () => {
    setLoadingState(true);
    setTimeout(() => {
      // Randomly succeed or fail
      const success = Math.random() > 0.5;
      setLoadingState(false);
      if (success) {
        setSuccessState(true);
        setTimeout(() => setSuccessState(false), 2000);
      } else {
        setErrorState(true);
        setTimeout(() => setErrorState(false), 2000);
      }
    }, 2000);
  };

  // Helper for input demo
  const validateInput = (value: string) => {
    setInputValue(value);

    if (value.length === 0) {
      setInputState('default');
      return;
    }

    setInputState('loading');
    setTimeout(() => {
      if (value.length < 3) {
        setInputState('error');
      } else {
        setInputState('success');
      }
    }, 1000);
  };

  // Get button state
  const getButtonState = (): 'loading' | 'success' | 'error' | 'default' => {
    if (loadingState) return 'loading';
    if (successState) return 'success';
    if (errorState) return 'error';
    return 'default';
  };

  // Helper text for input
  const getInputHelperText = (): string => {
    switch (inputState) {
      case 'error':
        return 'Input must be at least 3 characters';
      case 'success':
        return 'Input is valid';
      default:
        return 'Enter at least 3 characters';
    }
  };

  return (
    <div className="p-8 space-y-12">
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Interactive & Feedback States
        </h2>
        <p className="mb-6 text-textSecondary">
          A complete design system handles both interactive states (hover,
          focus, active, disabled) and feedback states (loading, success,
          error).
        </p>

        {/* Button States */}
        <div className="space-y-8">
          <div className="border-b border-border pb-8">
            <h3 className="text-lg font-medium mb-4">Button States</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-medium">Interactive State Demo</h4>
                <div className="flex flex-wrap gap-4">
                  <StatefulButton
                    onClick={handleButtonClick}
                    state={getButtonState()}
                  >
                    Click Me
                  </StatefulButton>
                  <StatefulButton variant="outline" disabled>
                    Disabled
                  </StatefulButton>
                </div>
                <p className="text-sm text-textSecondary">
                  The button above demonstrates hover, focus, active, loading,
                  success, and error states. Click it to see the feedback states
                  cycle.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Variant States</h4>
                <div className="flex flex-wrap gap-4">
                  <StatefulButton variant="solid">Solid</StatefulButton>
                  <StatefulButton variant="outline">Outline</StatefulButton>
                  <StatefulButton variant="ghost">Ghost</StatefulButton>
                </div>
                <div className="flex flex-wrap gap-4">
                  <StatefulButton state="success">Success</StatefulButton>
                  <StatefulButton state="error">Error</StatefulButton>
                  <StatefulButton state="loading">Loading</StatefulButton>
                </div>
              </div>
            </div>
          </div>

          {/* Input States */}
          <div className="border-b border-border pb-8">
            <h3 className="text-lg font-medium mb-4">Input States</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-medium">Interactive Input Demo</h4>
                <div className="max-w-md">
                  <StatefulInput
                    placeholder="Type something..."
                    value={inputValue}
                    onChange={(e) => validateInput(e.target.value)}
                    state={inputState}
                    helperText={getInputHelperText()}
                  />
                </div>
                <p className="text-sm text-textSecondary">
                  Type in the input to see different states. Input validates
                  after a brief loading state.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Input State Examples</h4>
                <div className="space-y-4 max-w-md">
                  <StatefulInput placeholder="Default input" />
                  <StatefulInput
                    placeholder="Success input"
                    state="success"
                    helperText="This input has valid data"
                    value="Valid input"
                  />
                  <StatefulInput
                    placeholder="Error input"
                    state="error"
                    helperText="This input has an error"
                    value="Invalid input"
                  />
                  <StatefulInput
                    placeholder="Disabled input"
                    disabled
                    value="Disabled input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card States */}
          <div>
            <h3 className="text-lg font-medium mb-4">Card States</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatefulCard
                interactive
                selected={selectedCard === 1}
                onClick={() => setSelectedCard(1)}
              >
                <h4 className="text-lg font-medium mb-2">Interactive Card</h4>
                <p className="text-textSecondary">
                  This card is interactive and selectable. Click to select.
                </p>
              </StatefulCard>

              <StatefulCard
                variant="outlined"
                interactive
                selected={selectedCard === 2}
                onClick={() => setSelectedCard(2)}
              >
                <h4 className="text-lg font-medium mb-2">Outlined Card</h4>
                <p className="text-textSecondary">
                  This is an outlined interactive card variant.
                </p>
              </StatefulCard>

              <StatefulCard variant="flat" interactive disabled>
                <h4 className="text-lg font-medium mb-2">Disabled Card</h4>
                <p className="text-textSecondary">
                  This interactive card is in a disabled state.
                </p>
              </StatefulCard>
            </div>
            <p className="text-sm text-textSecondary mt-4">
              Interactive cards demonstrate hover, active, focus, and selected
              states.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StateExamplesDemo;
