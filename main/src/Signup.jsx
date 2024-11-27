// src/Signup.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Paper, Alert, useTheme } from '@mui/material';

const Signup = () => {
  const theme = useTheme(); // Access the current theme for dark/light mode support
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User created successfully!');
      navigate('/login'); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.message);
    }
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
          backgroundColor: theme.palette.background.paper, // Adaptable card background color
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Sign up to get started
        </Typography>
        <Box component="form" onSubmit={handleSignup} sx={{ mt: 3 }}>
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 3 }}
          >
            Sign Up
          </Button>
        </Box>

        {/* Return to Login Button */}
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => navigate('/login')}
          sx={{ mt: 2 }}
        >
          Return to Login
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default Signup;
