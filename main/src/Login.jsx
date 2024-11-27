// src/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Paper, Alert, useTheme } from '@mui/material';

const Login = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); // Redirect to signup page
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default, // Adaptable background color
        padding: '1rem',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          borderRadius: '10px',
          textAlign: 'center',
          backgroundColor: theme.palette.background.paper, // Adaptable background color
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Please login to continue
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ backgroundColor: theme.palette.background.paper }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ backgroundColor: theme.palette.background.paper }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 3,
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ maxWidth: '150px' }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleSignUp}
              sx={{ maxWidth: '150px' }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default Login;
