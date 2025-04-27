// Export both the ThemeProvider and useTheme hook from a single entry point
import ThemeProvider from './ThemeProvider';
import { useThemeContext } from './hooks/useThemeContext';

// Re-export the hook with our desired name
export const useTheme = useThemeContext;

// Export the provider as both default and named export
export { ThemeProvider };
export default ThemeProvider;
