import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// Update imports to use the central index file
import ThemeProvider, { useTheme } from './theme';
import StateExamplesDemo, {
  StatefulButton,
  StatefulCard,
  StatefulInput,
} from './examples/ShapeUsageExamples';

// Theme Switcher Component
const ThemeSwitcher = () => {
  const { themeMode, setThemeMode, availableThemes, setThemeId } = useTheme();

  return (
    <div className="mb-8 p-4 bg-backgroundMuted rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Theme Controls</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <StatefulButton
          variant={themeMode === 'light' ? 'solid' : 'outline'}
          onClick={() => setThemeMode('light')}
          size="sm"
        >
          Light Mode
        </StatefulButton>
        <StatefulButton
          variant={themeMode === 'dark' ? 'solid' : 'outline'}
          onClick={() => setThemeMode('dark')}
          size="sm"
        >
          Dark Mode
        </StatefulButton>
        <StatefulButton
          variant={themeMode === 'system' ? 'solid' : 'outline'}
          onClick={() => setThemeMode('system')}
          size="sm"
        >
          System Mode
        </StatefulButton>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Theme Palette:</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {Object.entries(availableThemes).map(([id, theme]) => (
            <StatefulButton
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
            </StatefulButton>
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
  const [activeTab, setActiveTab] = useState('overview');

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

      <h1 className="text-3xl font-bold mb-4">Complete Design System</h1>

      {/* Tabs Navigation */}
      <div className="border-b border-border mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-1 ${
              activeTab === 'overview'
                ? 'border-b-2 border-primary font-medium text-primary'
                : 'text-textSecondary hover:text-text'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('shapes')}
            className={`pb-4 px-1 ${
              activeTab === 'shapes'
                ? 'border-b-2 border-primary font-medium text-primary'
                : 'text-textSecondary hover:text-text'
            }`}
          >
            Shape System
          </button>
          <button
            onClick={() => setActiveTab('states')}
            className={`pb-4 px-1 ${
              activeTab === 'states'
                ? 'border-b-2 border-primary font-medium text-primary'
                : 'text-textSecondary hover:text-text'
            }`}
          >
            State System
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          <StatefulCard className="mb-6">
            <div className="flex flex-col items-center">
              <StatefulButton onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </StatefulButton>
              <p className="mt-4">
                Edit <code>src/App.tsx</code> and save to test HMR
              </p>
            </div>
          </StatefulCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StatefulCard variant="outlined">
              <h2 className="text-xl font-semibold mb-3">Current Theme</h2>

              <div className="flex flex-wrap gap-2">
                <div
                  className="p-3 rounded"
                  style={{ backgroundColor: currentTheme.theme.colors.primary }}
                >
                  <span className="text-white">Primary</span>
                </div>
                <div
                  className="p-3 rounded"
                  style={{
                    backgroundColor: currentTheme.theme.colors.secondary,
                  }}
                >
                  <span className="text-white">Secondary</span>
                </div>
              </div>
            </StatefulCard>

            <StatefulCard variant="flat">
              <h2 className="text-xl font-semibold mb-3">
                Design System Features
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span>Color Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Typography System</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Spacing & Layout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Shape & Borders</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>State Management</span>
                </div>
              </div>
            </StatefulCard>
          </div>
        </>
      )}

      {activeTab === 'shapes' && (
        <div className="p-6 bg-background rounded-lg border border-border">
          <h2 className="text-2xl font-bold mb-6">Shape System</h2>
          <div className="space-y-4">
            <p>
              The Shape System manages border-radius, shadows, and overall
              component shape.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-none border border-border text-center">
                Border Radius: None
              </div>
              <div className="p-3 rounded-md border border-border text-center">
                Border Radius: Medium
              </div>
              <div className="p-3 rounded-full border border-border text-center">
                Border Radius: Full
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-background shadow-sm text-center">
                Shadow: Small
              </div>
              <div className="p-4 bg-background shadow-md text-center">
                Shadow: Medium
              </div>
              <div className="p-4 bg-background shadow-lg text-center">
                Shadow: Large
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">
              Shape Example Components
            </h3>
            <div className="space-y-4">
              <StatefulInput placeholder="Enter some text..." />
              <div className="flex flex-wrap gap-2">
                <StatefulButton size="sm">Square</StatefulButton>
                <StatefulButton size="sm">Default</StatefulButton>
                <StatefulButton size="sm">Rounded</StatefulButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'states' && <StateExamplesDemo />}

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
