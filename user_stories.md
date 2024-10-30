// User Stories and Implementation Status

User Registration

As a new user, I want to register with my email and a password so that I can create an account and access personalized fitness challenges.

Status: ✅ Implemented using Firebase Authentication for signup and login.

Daily Fitness Challenge Notification

As a registered user, I want to receive a daily notification for the workout challenge so that I am reminded to complete it and stay on track with my fitness goals.

Status: ❌ Not Implemented. We need to add functionality to send notifications, likely via Firebase Cloud Messaging.

Goal Setting

As a user, I want to set specific fitness goals (like weight loss, muscle gain, or increased endurance) so that I have a clear target to work towards.

Status: ✅ Implemented. Users can select a goal type and difficulty level, and their selection is stored in Firestore.

Challenge Difficulty Selection

As a user, I want to select the difficulty level (easy, medium, hard) of my daily challenge so that I can choose a workout that matches my current fitness level.

Status: ✅ Implemented. Users can select difficulty levels when setting their fitness goals.

Social Sharing

As a socially active user, I want to share my workout completions and achievements on my social media profile so that I can inspire my friends and gain recognition for my efforts.

Status: ❌ Not Implemented. We need to add a feature to share workouts and achievements on social media.

Friend Leaderboard

As a competitive user, I want to view a leaderboard of my friends based on their workout challenge completions so that I can compare my progress and stay motivated to keep up with them.

Status: ❌ Not Implemented. We need to implement a leaderboard that tracks progress among friends.

Custom Workout Creation

As a fitness expert, I want to create and share custom workout challenges so that I can challenge other users and offer tailored fitness routines.

Status: ❌ Not Implemented. Currently, workouts are pre-defined based on user goals and difficulty levels. We need to add the ability for experts to create custom workouts.

In-App Messaging

As a community-driven user, I want to send and receive messages from other users so that I can discuss fitness challenges, share tips, and motivate others.

Status: ❌ Not Implemented. We need to add messaging functionality between users.

Workout Completion Rewards

As a motivated user, I want to earn badges or points for completing workout challenges so that I can feel a sense of accomplishment and continue using the app regularly.

Status: ❌ Not Implemented. We need to add a gamification feature that rewards users for completing workouts.

Bookmark Favorite Activities

As a user, I want to be able to save activities so that I can easily return to my favorite activities.

Status: ❌ Not Implemented. We need to add the ability to bookmark or save specific workouts.

Summary of Implementation So Far:

User Registration/Login: Implemented using Firebase Authentication.

Goal Setting & Difficulty Selection: Implemented; users can select a goal and difficulty level, and it is saved in Firestore.

Custom Workouts Based on Goals: Implemented; users are presented with workouts based on their selected goal and difficulty.

Features Still to Implement:

Daily Notifications for fitness challenges.

Social Sharing functionality.

Friend Leaderboard to track and compare progress.

Custom Workout Creation by users or experts.

In-App Messaging for community engagement.

Workout Rewards such as badges or points.

Bookmark Favorite Activities for easy access.
