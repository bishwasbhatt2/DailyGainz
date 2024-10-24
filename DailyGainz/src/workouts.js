// src/workouts.js

const workouts = {
    weight_loss: {
      easy: ['20-minute brisk walk', '15 bodyweight squats', '10 push-ups'],
      medium: ['30-minute run', '20 burpees', '15 mountain climbers'],
      hard: ['40-minute HIIT workout', '25 burpees', '20 jump squats'],
    },
    muscle_gain: {
      easy: ['10 push-ups', '10 tricep dips', '10 bicep curls with light weights'],
      medium: ['15 bench presses', '20 dumbbell rows', '15 squats with weights'],
      hard: ['20 bench presses', '25 dumbbell rows', '20 deadlifts'],
    },
    endurance: {
      easy: ['15-minute cycling', '20-second plank', '20 jumping jacks'],
      medium: ['30-minute swimming', '1-minute plank', '30 jump lunges'],
      hard: ['45-minute running', '2-minute plank', '40 burpees'],
    },
  };
  
  export const getWorkouts = (goalType, difficulty) => {
    return workouts[goalType]?.[difficulty] || [];
  };
  