# DailyGainz Setup Instructions


## Prerequisites
- Node.js and npm should be installed.
- Firebase account for using Firestore and Authentication.
- A GitHub account for collaboration.


## Step 1: Fork the Repository
Make sure your forked repository is all synced with the upstream (main repository)


## Step 2: Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/bishwasbhatt2/DailyGainz.git
```


## Step 2.1: NPM/Node Version
Make sure you are using the following versions
```bash
npm: 10.7.0
node: 18.20.4(LTS)
```
How to download npm:
```
https://www.npmjs.com/package/npm/v/10.7.0
```
How to download node:
```
https://nodejs.org/en/blog/release/v18.20.4
```
Recommendation: You can just go to  and download that version if you just want to use that version but if you are working on multiple projects and you require multiple node versions, I recommend you installing nvm (node version manager)


## Step 3: Install Dependencies
Navigate into the project folder and install all necessary dependencies:
```bash
cd DailyGainz
cd main
npm install
```


## Step 4: Set Up Firebase (don't do this unless you are the owner of the project)
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


## Step 5: Running the Project
To start the project in development mode:
```bash
npm run dev
```
The app should be accessible at `http://localhost:5173`.


## Step 6: Collaborating with Git
- **Sync your fork**: Always make sure to sync your fork with the main repository in Github.

- **Pull the Latest Changes**: Then always pull those changes from your forked repo after it being synced with main repository before starting any work(you can do this while being anywhere inside the DailyGainz local repo):
  ```bash
  git pull origin main
  ```
- **Branching**: Create a new branch for your feature or bug fix (optiona):
  ```bash
  git checkout -b feature-branch-name
  ```
- **Commit and Push**: Commit your changes and push to GitHub:
  ```bash
  git add .
  git commit -m "Description of changes"
  git push origin feature-branch-name
  ```
Important Notice: If you make changes inside of main folder, make sure to do those commands while being inside of main, if you update things like README.md, HowtoContribute.md,user_stories.md, make sure to jump up to the top before committing your changes so 
```bash
cd .. 
```

- **Create Pull Request**: Go to GitHub and create a Pull Request to merge your changes to the `main` branch.
- Note: Make sure to follow the Pull Request template that is shown when creating a Pull Request


## Step 7: Firebase Rules for Development (Only for project owner)
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
