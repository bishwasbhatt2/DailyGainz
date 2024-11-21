import React, { useState } from 'react';
import {Box,Typography,TextField,Button,Paper,List,ListItem,IconButton} from '@mui/material';
import { db, auth } from './firebase';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const WorkoutCreation = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [exercisesInWorkout, setExercisesInWorkout] = useState([]);
    const [workoutTitle, setWorkoutTitle] = useState(''); // Optional: Add a workout title
    const navigate = useNavigate();

    // Add exercise to the current workout
    const handleAddExercise = () => {
        if (workoutName && reps && sets) {
            setExercisesInWorkout([
                ...exercisesInWorkout,
                {
                    workoutName,
                    reps: parseInt(reps),
                    sets: parseInt(sets),
                },
            ]);
            setWorkoutName('');
            setReps('');
            setSets('');
        }
    };

    // Save the current workout to the database
    const handleSaveWorkouts = async () => {
        const user = auth.currentUser;
        if (user && exercisesInWorkout.length > 0) {
            const workoutRef = doc(db, 'workouts', user.uid);
            const workout = {
                title: workoutTitle || `Workout ${new Date().toLocaleDateString()}`,
                exercises: exercisesInWorkout,
                timestamp: new Date(),
            };
            try {
                await setDoc(workoutRef, {
                    workouts: arrayUnion(workout),
                });
                navigate('/dashboard');
            } catch (error) {
                console.error('Error saving workout:', error);
            }
        } else {
            console.error('User is not authenticated or no exercises to save.');
        }
    };

    // Remove an exercise from the current workout
    const handleRemoveExercise = (index) => {
        const updatedExercises = exercisesInWorkout.filter((_, i) => i !== index);
        setExercisesInWorkout(updatedExercises);
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

                {/* Optional: Add a workout title input */}
                <TextField
                    label="Workout Title"
                    variant="outlined"
                    value={workoutTitle}
                    onChange={(e) => setWorkoutTitle(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField
                        label="Exercise Name"
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
                        onClick={handleAddExercise}
                        fullWidth
                    >
                        Add Exercise
                    </Button>
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Exercise List
                    </Typography>
                    <List>
                        {exercisesInWorkout.map((exercise, index) => (
                            <ListItem key={index} sx={{ justifyContent: 'space-between' }}>
                                <Typography variant="body1">
                                    {exercise.workoutName} - {exercise.reps} reps, {exercise.sets} sets
                                </Typography>
                                <IconButton
                                    onClick={() => handleRemoveExercise(index)}
                                    color="secondary"
                                >
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
