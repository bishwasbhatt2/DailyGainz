// Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase'; // Ensure your firebase.js is properly configured
import { setDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';
import {Box,Paper,Typography,Button,Select,MenuItem,FormControl,InputLabel,Alert,List,ListItem,useTheme,CircularProgress,} from '@mui/material';

const Dashboard = () => {
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [difficulty, setDifficulty] = useState('');
  const [goal, setGoal] = useState(null);
  const [error, setError] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0); // Timer state in seconds
  const navigate = useNavigate();

  // Handle user authentication and auto-fetch goals
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const goalRef = doc(db, 'goals', currentUser.uid);
        const goalDoc = await getDoc(goalRef);
        if (goalDoc.exists()) {
          setGoal(goalDoc.data());
        }
        // Listen to timer data
        listenToTimer(currentUser.uid);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const listenToTimer = (userId) => {
    const timerRef = doc(db, 'timers', userId); // Reference to the 'timers' collection

    return onSnapshot(timerRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data(); // Fetch data from the document
        setWorkouts(data.workouts); // Update workouts state

        const intervalMs = data.interval; // Interval in milliseconds
        const startTimeMs = data.startTime.toMillis(); // Get Firestore timestamp in milliseconds

        // Calculate remaining time dynamically
        const calculateRemainingTime = () => {
          const nowMs = Date.now(); // Get current time in milliseconds
          const elapsedMs = nowMs - startTimeMs; // Calculate elapsed time
          const remainingMs = intervalMs - elapsedMs; // Calculate remaining time
          return Math.max(0, Math.ceil(remainingMs / 1000)); // Convert to seconds and ensure non-negative
        };

        // Initial calculation
        setRemainingTime(calculateRemainingTime());

        // Start a countdown that updates every second
        const timerId = setInterval(() => {
          const newRemaining = calculateRemainingTime();
          setRemainingTime(newRemaining);

          // Clear the interval when the timer reaches 0
          if (newRemaining <= 0) {
            clearInterval(timerId);
          }
        }, 1000);

        return () => clearInterval(timerId); // Clean up interval on unmount
      } else {
        // If the timer document doesn't exist, reset the state
        setRemainingTime(0);
        setWorkouts([]);
      }
    });
  };

  const handleGoalSubmit = async (e) => {
    if (e) e.preventDefault();
    if (user) {
      try {
        const goalRef = doc(db, 'goals', user.uid);
        await setDoc(goalRef, { difficulty }); // Update the goals collection

        setGoal({ difficulty });
        setDifficulty('');
        setError('');

        // Call startTimer to reset the timer in the 'timers' collection
        await startTimer(user.uid, user.email, difficulty);

        // Refresh the page to reflect the changes
        window.location.reload();
      } catch (err) {
        console.error('Error setting goal:', err);
        setError('Error setting goal. Please try again.');
      }
    }
  };

  // Function to call backend to start the timer
  const startTimer = async (userId, email, difficulty) => {
    try {
      await fetch('http://localhost:5000/start-timer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email, difficulty }),
      });
    } catch (err) {
      console.error('Error starting timer:', err);
      setError('Could not start timer. Please ensure the backend server is running.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  // Function to format remaining time into hours, minutes, and seconds
  const formatRemainingTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
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
          backgroundColor: theme.palette.background.paper,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Welcome to Your Dashboard
        </Typography>
        {user && (
          <Typography variant="body1" color="text.secondary" gutterBottom>
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
          <Button variant="outlined" color="primary" onClick={() => navigate('/workout-creation')}>
            Create Workout
          </Button>
          {/* New Rewards Button */}
          <Button variant="outlined" color="primary" onClick={() => navigate('/rewards')}>
            Rewards
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Set Your Fitness Goal
          </Typography>
          {goal && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
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

        {goal && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Next Workout Email In:</Typography>
            <Typography variant="h4" color="primary">
              {formatRemainingTime(remainingTime)}
            </Typography>
            <CircularProgress
              variant="determinate"
              value={(remainingTime / (24 * 60 * 60)) * 100}
              sx={{ mt: 2 }}
            />
          </Box>
        )}

        {workouts.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Your Workout:
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
