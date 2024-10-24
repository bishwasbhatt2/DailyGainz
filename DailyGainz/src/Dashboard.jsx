// src/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { getWorkouts } from './workouts';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [goalType, setGoalType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [goal, setGoal] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch existing goal data if available
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

  useEffect(() => {
    console.log("Current goal state:", goal);
  }, [goal]);

  // Handle goal submission
  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const goalRef = doc(db, 'goals', user.uid);
        await setDoc(goalRef, { goalType, difficulty });
        setGoal({ goalType, difficulty });
        setGoalType('');
        setDifficulty('');
        alert('Goal set successfully!');
      } catch (err) {
        console.error('Error setting goal:', err);
      }
    }
  };

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const workouts = goal ? getWorkouts(goal.goalType, goal.difficulty) : [];
  console.log("Generated Workouts:", workouts);

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      {user && <p>Logged in as: {user.email}</p>}
      <button onClick={handleLogout}>Logout</button>

      <div style={{ marginTop: '20px' }}>
        <h3>Set Your Fitness Goal</h3>
        {goal && (
          <p>
            Your Current Goal: {goal.goalType} - Difficulty: {goal.difficulty}
          </p>
        )}
        <form onSubmit={handleGoalSubmit}>
          <label>
            Select Goal Type:
            <select value={goalType} onChange={(e) => setGoalType(e.target.value)} required>
              <option value="" disabled>
                -- Select a Goal --
              </option>
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="endurance">Endurance</option>
            </select>
          </label>

          <label>
            Select Difficulty Level:
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
              <option value="" disabled>
                -- Select Difficulty --
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>

          <button type="submit">Set Goal</button>
        </form>
      </div>

      <div style={{ marginTop: '20px' }}>
        {goal && (
          <>
            <h3>Your Custom Workouts</h3>
            <ul>
              {workouts.map((workout, index) => (
                <li key={index}>{workout}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
