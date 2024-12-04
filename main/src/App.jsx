import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Leaderboard from './Leaderboard.jsx';
import WorkoutCreation from './WorkoutCreation.jsx';
import RewardsSystem from './RewardsSystem.jsx';
import Cookies from 'js-cookie';

function App() {
  // Initialize darkMode state from cookies
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = Cookies.get('darkMode');
    return savedMode === 'true' || false;
  });

  // Update cookie whenever darkMode changes
  useEffect(() => {
    Cookies.set('darkMode', darkMode, { expires: 365 }); // Expires in 365 days
  }, [darkMode]);

  // Define light theme
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2', // Custom primary color for light mode
      },
      secondary: {
        main: '#9c27b0',
      },
      background: {
        default: '#ffffff',
        paper: '#f9f9f9',
      },
      text: {
        primary: '#213547',
        secondary: '#535bf2',
      },
    },
  });

  // Define dark theme
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9', // Custom primary color for dark mode
      },
      secondary: {
        main: '#f48fb1',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: '#888',
      },
    },
  });

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <div style={{ padding: '16px' }}>
          <Button variant="contained" onClick={handleThemeToggle}>
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </Button>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workout-creation" element={<WorkoutCreation />} />
            <Route path="/rewards" element={<RewardsSystem />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
