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
  const [difficulty, setDifficulty] = useState('');
  const [goal, setGoal] = useState(null);
  const [error, setError] = useState('');
  const [workouts, setWorkouts] = useState([]); // State for workout recommendations
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
        await setDoc(goalRef, { difficulty });
        setGoal({ difficulty });
        setDifficulty(''); // Clear difficulty after setting goal
        setError('');

        // Generate a new workout recommendation
        const selectedWorkout = getWorkouts(difficulty);
        setWorkouts(selectedWorkout); // Set workout to be displayed

      } catch (err) {
        setError('Error setting goal. Please try again.');
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

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
              Current Difficulty: {goal.difficulty}
            </Typography>
          )}
          <Box component="form" onSubmit={handleGoalSubmit} sx={{ mt: 2 }}>
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
              Recommended Workout
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
