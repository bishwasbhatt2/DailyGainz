// src/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { getWorkouts } from './workouts';
import { Box, Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel, Alert, List, ListItem } from '@mui/material';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [goalType, setGoalType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [goal, setGoal] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const goalRef = doc(db, 'goals', currentUser.uid);
        const goalDoc = await getDoc(goalRef);
        if (goalDoc.exists()) {
          setGoal(goalDoc.data());
        }
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const goalRef = doc(db, 'goals', user.uid);
        await setDoc(goalRef, { goalType, difficulty });
        setGoal({ goalType, difficulty });
        setGoalType(''); // Clear goalType after setting goal
        setDifficulty(''); // Clear difficulty after setting goal
        setError('');
      } catch (err) {
        setError('Error setting goal. Please try again.');
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const workouts = goal ? getWorkouts(goal.goalType, goal.difficulty) : [];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7f9fc',
        padding: '1rem',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: '600px',
          padding: '2rem',
          borderRadius: '10px',
          backgroundColor: '#ffffff',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Welcome to Your Dashboard
        </Typography>
        {user && (
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Logged in as: {user.email}
          </Typography>
        )}

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
          <Button variant="outlined" color="primary" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="outlined" color="primary" onClick={() => navigate('/leaderboard')}>
            View Leaderboard
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Set Your Fitness Goal
          </Typography>
          {goal && (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Current Goal: {goal.goalType} - Difficulty: {goal.difficulty}
            </Typography>
          )}
          <Box component="form" onSubmit={handleGoalSubmit} sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Goal Type</InputLabel>
              <Select
                value={goalType}
                onChange={(e) => setGoalType(e.target.value)}
                label="Goal Type"
                required
              >
                <MenuItem value="weight_loss">Weight Loss</MenuItem>
                <MenuItem value="muscle_gain">Muscle Gain</MenuItem>
                <MenuItem value="endurance">Endurance</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Difficulty Level</InputLabel>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                label="Difficulty Level"
                required
              >
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              Set Goal
            </Button>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>

        {goal && workouts.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Recommended Workouts
            </Typography>
            <List>
              {workouts.map((workout, index) => (
                <ListItem key={index} sx={{ justifyContent: 'center' }}>
                  <Typography variant="body1">{workout}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;