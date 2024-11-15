import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, List, ListItem, IconButton } from '@mui/material';
import { db, auth } from './firebase';
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const WorkoutCreation = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const navigate = useNavigate();

    // Add workout to local state
    const handleAddWorkout = () => {
        if (workoutName && reps && sets) {
            setWorkouts([...workouts, { workoutName, reps: parseInt(reps), sets: parseInt(sets) }]);
            setWorkoutName('');
            setReps('');
            setSets('');
        }
    };

    const handleSaveWorkouts = async () => {
        const user = auth.currentUser;
        console.log("Current user:", user ? user.uid : "No user found");
        if (user && workouts.length > 0) {
            const workoutRef = doc(db, 'workouts', user.uid);
            try {
                await setDoc(workoutRef, { workoutList: workouts }, { merge: true });
                navigate('/dashboard');
            } catch (error) {
                console.error('Error saving workout:', error);
            }
        } else {
            console.error("User is not authenticated or no workouts to save.");
        }
    };


    // Remove a workout from the local state
    const handleRemoveWorkout = (index) => {
        const updatedWorkouts = workouts.filter((_, i) => i !== index);
        setWorkouts(updatedWorkouts);
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
                    Create Your Workout
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField
                        label="Workout Name"
                        variant="outlined"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Reps"
                        type="number"
                        variant="outlined"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Sets"
                        type="number"
                        variant="outlined"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleAddWorkout}
                        fullWidth
                    >
                        Add Exercise
                    </Button>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Workout List
                    </Typography>
                    <List>
                        {workouts.map((workout, index) => (
                            <ListItem key={index} sx={{ justifyContent: 'space-between' }}>
                                <Typography variant="body1">
                                    {workout.workoutName} - {workout.reps} reps, {workout.sets} sets
                                </Typography>
                                <IconButton onClick={() => handleRemoveWorkout(index)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveWorkouts}
                    sx={{ mt: 4 }}
                    fullWidth
                >
                    Save Workout Plan
                </Button>
            </Paper>
        </Box>
    );
};

export default WorkoutCreation;
