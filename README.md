# DailyGainz Setup Instructions

## Prerequisites
- Node.js and npm should be installed.
- Firebase account for using Firestore and Authentication.
- A GitHub account for collaboration.

## Step 1: Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/bishwasbhatt2/DailyGainz.git
```

## Step 2: Install Dependencies
Navigate into the project folder and install all necessary dependencies:
```bash
cd DailyGainz
npm install
```

## Step 3: Set Up Firebase
- Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
- Add a web app to your Firebase project and get the Firebase configuration object.
- Update the `firebase.js` file in the project with your Firebase credentials:
  ```javascript
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  };
  ```

## Step 4: Running the Project
To start the project in development mode:
```bash
npm run dev
```
The app should be accessible at `http://localhost:5173`.

## Step 5: Collaborating with Git
- **Pull the Latest Changes**: Always pull the latest changes before starting any work:
  ```bash
  git pull origin main
  ```
- **Branching**: Create a new branch for your feature or bug fix:
  ```bash
  git checkout -b feature-branch-name
  ```
- **Commit and Push**: Commit your changes and push to GitHub:
  ```bash
  git add .
  git commit -m "Description of changes"
  git push origin feature-branch-name
  ```
- **Create Pull Request**: Go to GitHub and create a Pull Request to merge your changes to the `main` branch.

## Step 6: Firebase Rules for Development
To allow everyone to work with Firestore during development, use the following rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
Make sure to update these rules before going to production.

## Troubleshooting
- **Dependency Issues**: If you encounter errors during `npm install`, try deleting the `node_modules` folder and running `npm install` again.
- **Firebase Authentication**: Make sure to enable **Email/Password** authentication in the Firebase Console.

Feel free to reach out to the team if you need help setting up or understanding anything!
