// src/workouts.js
const workouts = {
  Easy: [
    '10 push-ups',
    '20 sit-ups',
    '15-minute jog',
    '30-second plank',
    '10 squats',
    '30 seconds high knees',
    '10 leg raises',
    '15 crunches',
    '10 lunges (both legs)',
    '15-second side plank (each arm)'
  ],
  Medium: [
    '20 push-ups',
    '30 sit-ups',
    '30-minute jog',
    '60-second plank',
    '10 burpees',
    '20 squats',
    '20 lunges (both legs)',
    '30-second side plank (each arm)',
    '60-second jumping jacks',
    '100 jump ropes',
    '5 pull-ups'
  ],
  Hard: [
    '40-minute HIIT workout',
    '25 burpees',
    '20 jump squats',
    '200-300 jump ropes',
    '90-second plank',
    '50 sit-ups',
    '30 push-ups',
    '45-minute jog',
    '60 second side plank (each arm)',
    '10 pull-ups'
  ]
};

export const getWorkouts = (difficulty) => {
  const workoutList = workouts[difficulty] || [];
  if (workoutList.length === 0) return []; // Return an empty array if no workouts are found

  // Select a random workout from the list
  const randomWorkout = workoutList[Math.floor(Math.random() * workoutList.length)];
  return [randomWorkout]; // Return as an array to maintain consistency with the List component
};
