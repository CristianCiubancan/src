import React from 'react';
import { defaultShapeSystemConfig } from '../theme/config/shape';

// Example Card component using the shape system
export const Card: React.FC<{
  children: React.ReactNode;
  variant?: 'flat' | 'outlined' | 'elevated';
  radius?: keyof typeof defaultShapeSystemConfig.shape.borderRadius;
  className?: string;
}> = ({ children, variant = 'elevated', radius = 'lg', className = '' }) => {
  // Base styles
  const baseStyles = `
    p-6
    overflow-hidden
  `;

  // Border radius from theme
  const radiusStyles = `rounded-${radius}`;

  // Variant-specific styles
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
    case 'elevated':
    default:
      variantStyles = `
        bg-background
        shadow-md
        border-none
      `;
      break;
  }

  // Combined styles
  const styles = `${baseStyles} ${radiusStyles} ${variantStyles} ${className}`;

  return <div className={styles}>{children}</div>;
};

// Example Button component using the shape system
export const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  radius?: keyof typeof defaultShapeSystemConfig.shape.borderRadius;
  className?: string;
  onClick?: () => void;
}> = ({
  children,
  variant = 'solid',
  size = 'md',
  radius = 'md',
  className = '',
  onClick,
}) => {
  // Base styles
  const baseStyles = `
    font-medium
    inline-flex
    items-center
    justify-center
    transition-all
    duration-200
  `;

  // Size-specific styles
  let sizeStyles = '';

  switch (size) {
    case 'sm':
      sizeStyles = `
        px-3
        py-1.5
        text-sm
      `;
      break;
    case 'lg':
      sizeStyles = `
        px-6
        py-3
        text-lg
      `;
      break;
    case 'md':
    default:
      sizeStyles = `
        px-4
        py-2
        text-base
      `;
      break;
  }

  // Border radius from theme
  const radiusStyles = `rounded-${radius}`;

  // Variant-specific styles
  let variantStyles = '';

  switch (variant) {
    case 'outline':
      variantStyles = `
        bg-transparent
        border border-width-light border-primary
        text-primary
        hover:bg-primarySubtle
      `;
      break;
    case 'ghost':
      variantStyles = `
        bg-transparent
        border-none
        text-primary
        hover:bg-primarySubtle
      `;
      break;
    case 'solid':
    default:
      variantStyles = `
        bg-primary
        border-none
        text-white
        shadow-sm
        hover:bg-primaryHover
        active:shadow-none
      `;
      break;
  }

  // Combined styles
  const styles = `${baseStyles} ${sizeStyles} ${radiusStyles} ${variantStyles} ${className}`;

  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  );
};

// Example Input component using the shape system
export const Input: React.FC<{
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  radius?: keyof typeof defaultShapeSystemConfig.shape.borderRadius;
  className?: string;
}> = ({ placeholder, value, onChange, radius = 'md', className = '' }) => {
  // Base styles
  const baseStyles = `
    w-full
    px-4
    py-2
    bg-background
    border border-width-light border-border
    focus:outline-none
    focus:border-primary
    focus:ring-1
    focus:ring-primaryOutline
    transition-all
    duration-200
  `;

  // Border radius from theme
  const radiusStyles = `rounded-${radius}`;

  // Combined styles
  const styles = `${baseStyles} ${radiusStyles} ${className}`;

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles}
    />
  );
};

// Example Badge component
export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}> = ({ children, variant = 'primary', className = '' }) => {
  // Base styles
  const baseStyles = `
    inline-flex
    items-center
    justify-center
    px-2
    py-0.5
    text-xs
    font-medium
    rounded-full
  `;

  // Variant-specific styles
  let variantStyles = '';

  switch (variant) {
    case 'success':
      variantStyles = 'bg-successSubtle text-success';
      break;
    case 'warning':
      variantStyles = 'bg-warningSubtle text-warning';
      break;
    case 'error':
      variantStyles = 'bg-errorSubtle text-error';
      break;
    case 'info':
      variantStyles = 'bg-infoSubtle text-info';
      break;
    case 'primary':
    default:
      variantStyles = 'bg-primarySubtle text-primary';
      break;
  }

  // Combined styles
  const styles = `${baseStyles} ${variantStyles} ${className}`;

  return <span className={styles}>{children}</span>;
};

// Example Tooltip component using the shape system
export const Tooltip: React.FC<{
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}> = ({ content, children, position = 'top', className = '' }) => {
  // Group styles for the tooltip container
  const containerStyles = `
    relative
    inline-flex
    group
  `;

  // Base styles for the tooltip
  const baseStyles = `
    absolute
    invisible
    opacity-0
    bg-backgroundSubtle
    text-text
    text-sm
    px-2
    py-1
    whitespace-nowrap
    shadow-sm
    rounded-sm
    transition-opacity
    duration-200
    z-10
    group-hover:visible
    group-hover:opacity-100
  `;

  // Position-specific styles
  let positionStyles = '';

  switch (position) {
    case 'right':
      positionStyles = 'left-full ml-2 top-1/2 transform -translate-y-1/2';
      break;
    case 'bottom':
      positionStyles = 'top-full mt-2 left-1/2 transform -translate-x-1/2';
      break;
    case 'left':
      positionStyles = 'right-full mr-2 top-1/2 transform -translate-y-1/2';
      break;
    case 'top':
    default:
      positionStyles = 'bottom-full mb-2 left-1/2 transform -translate-x-1/2';
      break;
  }

  // Combined styles
  const tooltipStyles = `${baseStyles} ${positionStyles} ${className}`;

  return (
    <div className={containerStyles}>
      {children}
      <div className={tooltipStyles}>{content}</div>
    </div>
  );
};

// Demo component showcasing all the shape examples
export const ShapeExamplesDemo: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Shape System Examples</h1>

      {/* Cards Example */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="flat">
            <h3 className="text-lg font-medium mb-2">Flat Card</h3>
            <p>This card uses the flat variant without shadows.</p>
          </Card>

          <Card variant="outlined">
            <h3 className="text-lg font-medium mb-2">Outlined Card</h3>
            <p>This card uses borders instead of shadows.</p>
          </Card>

          <Card variant="elevated">
            <h3 className="text-lg font-medium mb-2">Elevated Card</h3>
            <p>This card uses the default shadow elevation.</p>
          </Card>
        </div>
      </section>

      {/* Buttons Example */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="solid">Solid Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>

          <Button size="sm">Small Button</Button>
          <Button size="md">Medium Button</Button>
          <Button size="lg">Large Button</Button>

          <Button radius="none">Square Button</Button>
          <Button radius="md">Regular Button</Button>
          <Button radius="full">Pill Button</Button>
        </div>
      </section>

      {/* Inputs Example */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Default input" />
          <Input placeholder="Square input" radius="none" />
          <Input placeholder="Rounded input" radius="lg" />
          <Input placeholder="Pill input" radius="full" />
        </div>
      </section>

      {/* Badges Example */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </section>

      {/* Tooltips Example */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Tooltips</h2>
        <div className="flex flex-wrap gap-8 justify-center">
          <Tooltip content="Top tooltip" position="top">
            <Button variant="outline" size="sm">
              Hover Me (Top)
            </Button>
          </Tooltip>

          <Tooltip content="Right tooltip" position="right">
            <Button variant="outline" size="sm">
              Hover Me (Right)
            </Button>
          </Tooltip>

          <Tooltip content="Bottom tooltip" position="bottom">
            <Button variant="outline" size="sm">
              Hover Me (Bottom)
            </Button>
          </Tooltip>

          <Tooltip content="Left tooltip" position="left">
            <Button variant="outline" size="sm">
              Hover Me (Left)
            </Button>
          </Tooltip>
        </div>
      </section>
    </div>
  );
};

export default ShapeExamplesDemo;
