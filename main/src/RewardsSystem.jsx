// RewardsSystem.jsx
import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Paper, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
} from '@mui/material';
import { doc, getDoc, updateDoc, setDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const difficultyPoints = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

const RewardsSystem = () => {
  const theme = useTheme();
  const [dailyWorkout, setDailyWorkout] = useState(null);
  const [points, setPoints] = useState(0);
  const [user, setUser] = useState(null);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // Fetch user data and points on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Set up snapshot listener for workouts
        listenToWorkout(currentUser.uid);

        // Fetch current points
        const pointsRef = doc(db, "points", currentUser.uid);
        const pointsDoc = await getDoc(pointsRef);
        if (pointsDoc.exists()) {
          setPoints(pointsDoc.data().points || 0);
          if (!pointsDoc.data().name) {
            setShowNameDialog(true);
          }
        } else {
          await setDoc(pointsRef, { points: 0 });
          setShowNameDialog(true);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to listen to workout data from Firestore
  const listenToWorkout = (userId) => {
    const timerRef = doc(db, "timers", userId);

    const unsubscribe = onSnapshot(timerRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        // Console log the data received from Firestore
        console.log("Data from timers collection:", data);

        if (data.workouts && data.workouts.length > 0) {
          // Select a random workout and update the dailyWorkout state
          const randomIndex = Math.floor(Math.random() * data.workouts.length);
          const selectedWorkout = data.workouts[randomIndex];

          // Console log the selected workout
          console.log("Selected workout:", selectedWorkout);

          setDailyWorkout({ workout: selectedWorkout, difficulty: data.difficulty });
          setWorkoutCompleted(data.completed || false); // Set workout completion status from Firestore
        } else {
          console.log("No workouts found in timers collection.");
          setDailyWorkout({ workout: "No workout available", difficulty: "N/A" });
        }
      } else {
        console.log("Timer document does not exist for userId:", userId);
        setDailyWorkout({ workout: "No workout available", difficulty: "N/A" });
      }
    });

    return unsubscribe; // Return unsubscribe function to clean up
  };

  const handleFinish = async () => {
    if (!dailyWorkout) {
      console.error("No daily workout to finish.");
      return;
    }

    try {
      // Update Firestore to mark workout as completed
      const timerRef = doc(db, "timers", user.uid);
      await updateDoc(timerRef, { completed: true });

      // Update points and display award in dialog
      await storePoints();
      setWorkoutCompleted(true); // Update local state to reflect workout completion
      setOpen(true);
    } catch (err) {
      console.error("Error marking workout as completed:", err);
    }
  };

  // Update the storePoints function to return a promise
  const storePoints = async () => {
    if (!dailyWorkout) return;

    const earnedPoints = difficultyPoints[dailyWorkout.difficulty] || 1;
    const updatedPoints = points + earnedPoints;
    setPoints(updatedPoints);

    if (user) {
      try {
        const pointsRef = doc(db, "points", user.uid);
        await updateDoc(pointsRef, { points: updatedPoints });
        console.log(`Points successfully updated to: ${updatedPoints}`);
      } catch (err) {
        console.error("Error updating points in Firestore:", err);
      }
    }
  };

  // Function to handle name submission
  const handleNameSubmit = async () => {
    if (name.trim()) {
      if (user) {
        try {
          const pointsRef = doc(db, "points", user.uid);
          await updateDoc(pointsRef, { name });
          setShowNameDialog(false);
        } catch (err) {
          console.error("Error saving name to Firestore:", err);
        }
      }
    } else {
      alert("Name cannot be empty!");
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
          Rewards System
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Today's Workout
          </Typography>
          {dailyWorkout ? (
            <>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Workout: <strong>{dailyWorkout.workout}</strong>
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Difficulty: <strong>{dailyWorkout.difficulty}</strong>
              </Typography>
            </>
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Loading workout...
            </Typography>
          )}
        </Box>

        <Button
          sx={{ mt: 4 }}
          onClick={handleFinish}
          variant="contained"
          color="primary"
          disabled={workoutCompleted || !dailyWorkout || dailyWorkout.workout === "No workout available"}
        >
          Finish
        </Button>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>Total Points: {points}</Typography>
        </Box>
      </Paper>

      <Dialog open={showNameDialog}>
        <DialogTitle>Leaderboard Name</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            Please enter your name to continue. This information will be used to display your rank in the leaderboard.
          </Box>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNameSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Great Job</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography>
              You earned {difficultyPoints[dailyWorkout?.difficulty] || 1} points for completing the workout!
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RewardsSystem;
