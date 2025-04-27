import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

// Extract the hook to a separate file to avoid the fast refresh warning
export const useThemeContext = () => useContext(ThemeContext);
