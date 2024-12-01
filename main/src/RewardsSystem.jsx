import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Import Firebase services
import { onAuthStateChanged } from "firebase/auth";

// workouts
const workouts = [
  { difficulty: "Easy", workout: "10 push-ups" },
  { difficulty: "Easy", workout: "20 sit-ups" },
  { difficulty: "Easy", workout: "15-minute jog" },
  { difficulty: "Easy", workout: "30-second plank" },
  { difficulty: "Easy", workout: "10 squats" },
  { difficulty: "Easy", workout: "30 seconds high knees" },
  { difficulty: "Easy", workout: "10 leg raises" },
  { difficulty: "Easy", workout: "15 crunches" },
  { difficulty: "Easy", workout: "10 lunges (both legs)" },
  { difficulty: "Easy", workout: "15-second side plank (each arm)" },
  { difficulty: "Medium", workout: "20 push-ups" },
  { difficulty: "Medium", workout: "30 sit-ups" },
  { difficulty: "Medium", workout: "30-minute jog" },
  { difficulty: "Medium", workout: "60-second plank" },
  { difficulty: "Medium", workout: "10 burpees" },
  { difficulty: "Medium", workout: "20 squats" },
  { difficulty: "Medium", workout: "20 lunges (both legs)" },
  { difficulty: "Medium", workout: "30-second side plank (each arm)" },
  { difficulty: "Medium", workout: "60-second jumping jacks" },
  { difficulty: "Medium", workout: "100 jump ropes" },
  { difficulty: "Hard", workout: "40-minute HIIT workout" },
  { difficulty: "Hard", workout: "25 burpees" },
  { difficulty: "Hard", workout: "20 jump squats" },
  { difficulty: "Hard", workout: "200-300 jump ropes" },
  { difficulty: "Hard", workout: "90-second plank" },
  { difficulty: "Hard", workout: "50 sit-ups" },
  { difficulty: "Hard", workout: "30 push-ups" },
  { difficulty: "Hard", workout: "45-minute jog" },
  { difficulty: "Hard", workout: "60 second side plank (each arm)" },
  { difficulty: "Hard", workout: "10 pull-ups" },
];

const difficultyPoints = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

const RewardsSystem = () => {
  const [dailyWorkout, setDailyWorkout] = useState(getRandomWorkout());
  const [points, setPoints] = useState(0);
  const [user, setUser] = useState(null);

  // Fetch user data and points on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch current points from Firestore
        const pointsRef = doc(db, "points", currentUser.uid);
        const pointsDoc = await getDoc(pointsRef);
        if (pointsDoc.exists()) {
          setPoints(pointsDoc.data().points || 0);
        } else {
          // Initialize points in Firestore if no document exists
          await setDoc(pointsRef, { points: 0 });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to get a random workout
  function getRandomWorkout() {
    return workouts[Math.floor(Math.random() * workouts.length)];
  }

  // Function to handle finishing a workout
  const handleFinish = async () => {
    const earnedPoints = difficultyPoints[dailyWorkout.difficulty];
    const updatedPoints = points + earnedPoints;

    // Update local points
    setPoints(updatedPoints);
    alert(`You earned ${earnedPoints} points for completing ${dailyWorkout.workout}!`);

    // Sync points with Firestore
    if (user) {
      try {
        const pointsRef = doc(db, "points", user.uid);
        await updateDoc(pointsRef, { points: updatedPoints });
        console.log(`Points successfully updated to: ${updatedPoints}`);
      } catch (err) {
        console.error("Error updating points in Firestore:", err);
      }
    }

    // Assign a new workout
    setDailyWorkout(getRandomWorkout());
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Daily Gainz - Rewards System</h1>
      <div style={{ margin: "20px 0" }}>
        <h2>Today's Workout</h2>
        <p>
          <strong>Workout:</strong> {dailyWorkout.workout}
        </p>
        <p>
          <strong>Difficulty:</strong> {dailyWorkout.difficulty}
        </p>
      </div>
      <button
        onClick={handleFinish}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Finish
      </button>
      <div style={{ marginTop: "20px" }}>
        <h2>Total Points: {points}</h2>
      </div>
    </div>
  );
};

export default RewardsSystem;
