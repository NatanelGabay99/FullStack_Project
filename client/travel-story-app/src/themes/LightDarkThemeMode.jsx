import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../providers/ThemeProvider';
const LightDarkThemeMode = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <FaSun className="text-yellow-400" size={24} />
        ) : (
          <FaMoon className="text-gray-800" size={24} />
        )}
      </button>
  );
};

export default LightDarkThemeMode;
