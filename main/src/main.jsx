import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import './index.css';

const Main = () => {
  // State to control dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Define the theme based on dark mode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#9c27b0',
      },
      background: {
        default: darkMode ? '#121212' : '#ffffff',
        paper: darkMode ? '#1e1e1e' : '#f9f9f9',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#213547',
        secondary: darkMode ? '#888' : '#535bf2',
      },
    },
  });

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App setDarkMode={setDarkMode} darkMode={darkMode} />
      </ThemeProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Main />);
