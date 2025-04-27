import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ThemeProvider, { useTheme } from './theme/ThemeProvider';
import {
  Card,
  Button,
  Input,
  Badge,
  Tooltip,
} from './examples/ShapeUsageExamples';

// Theme Switcher Component
const ThemeSwitcher = () => {
  const { themeMode, setThemeMode, availableThemes, setThemeId } = useTheme();

  return (
    <div className="mb-8 p-4 bg-backgroundMuted rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Theme Controls</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <Button
          variant={themeMode === 'light' ? 'solid' : 'outline'}
          onClick={() => setThemeMode('light')}
          size="sm"
        >
          Light Mode
        </Button>
        <Button
          variant={themeMode === 'dark' ? 'solid' : 'outline'}
          onClick={() => setThemeMode('dark')}
          size="sm"
        >
          Dark Mode
        </Button>
        <Button
          variant={themeMode === 'system' ? 'solid' : 'outline'}
          onClick={() => setThemeMode('system')}
          size="sm"
        >
          System Mode
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Theme Palette:</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {Object.entries(availableThemes).map(([id, theme]) => (
            <Button
              key={id}
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => setThemeId(id)}
            >
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: theme.colors.primary }}
              />
              {theme.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App content component that uses the theme
const AppContent = () => {
  const [count, setCount] = useState(0);
  const { currentTheme } = useTheme();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <ThemeSwitcher />

      <div className="mb-6">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1 className="text-3xl font-bold mb-4">Vite + React + Design System</h1>

      <Card className="mb-6">
        <div className="flex flex-col items-center">
          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
          <p className="mt-4">
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card variant="outlined">
          <h2 className="text-xl font-semibold mb-3">Current Theme</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="primary">ID: {currentTheme.theme.id}</Badge>
            <Badge variant="info">Mode: {currentTheme.theme.name}</Badge>
            <Tooltip
              content={
                currentTheme.theme.description || 'No description available'
              }
            >
              <Badge variant="info">Info</Badge>
            </Tooltip>
          </div>
          <div className="flex flex-wrap gap-2">
            <div
              className="p-3 rounded"
              style={{ backgroundColor: currentTheme.theme.colors.primary }}
            >
              <span className="text-white">Primary</span>
            </div>
            <div
              className="p-3 rounded"
              style={{ backgroundColor: currentTheme.theme.colors.secondary }}
            >
              <span className="text-white">Secondary</span>
            </div>
          </div>
        </Card>

        <Card variant="flat">
          <h2 className="text-xl font-semibold mb-3">Shape System Demo</h2>
          <div className="space-y-4">
            <Input placeholder="Enter some text..." />
            <div className="flex flex-wrap gap-2">
              <Button size="sm" radius="none">
                Square
              </Button>
              <Button size="sm">Default</Button>
              <Button size="sm" radius="full">
                Rounded
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <p className="text-textSecondary">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

// Main App with ThemeProvider wrapper
function App() {
  return (
    <ThemeProvider initialMode="system" initialThemeId="light">
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
