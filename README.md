# TaskFlow

TaskFlow is a modern personal task management web application developed with React and Firebase. It allows users to create an account, log in securely, manage personal tasks, and monitor their progress through an interactive dashboard.

Each registered user can access and manage only their own tasks.

## Live Project

* **Live Demo:** [TaskFlow Live App](https://task-flow-nine-ashy.vercel.app/login)
* **GitHub Repository:** [TaskFlow Source Code](https://github.com/HamadAliKhan022/TaskFlow)

## Project Overview

TaskFlow was developed to demonstrate a complete React and Firebase application containing:

* Firebase Authentication
* Protected and public routes
* Cloud Firestore integration
* Complete CRUD operations
* Real-time task updates
* Dashboard statistics
* Search, filtering, and sorting
* Responsive Material UI design

This is a personal task management application. It does not contain an admin panel or task assignment between users.

## Main Features

### Authentication 

* Create a new user account
* Login using email and password
* Logout functionality
* Firebase Email and Password Authentication
* Remember Me authentication persistence
* User profile storage in Firestore
* Protected dashboard and task routes
* Public route protection for authenticated users
* Form validation
* Firebase error handling

### Dashboard

* Personalized welcome message
* Total tasks
* Pending tasks
* In-progress tasks
* Completed tasks
* High-priority tasks
* Completion percentage
* Task progress indicator
* Task status chart
* Recently added tasks
* Quick Add Task button
* Loading skeletons
* Error handling

### Task Management

TaskFlow provides complete CRUD operations.

#### Create

Users can create tasks containing:

* Title
* Description
* Due date
* Status
* Priority

#### Read

Users can view only the tasks connected to their Firebase Authentication UID.

#### Update

Users can:

* Edit task information
* Change task status
* Change task priority
* Change the due date
* Mark a task as completed

#### Delete

Users can delete tasks through a confirmation dialog.

### Search, Filter, and Sort

* Search tasks by title
* Filter by task status
* Filter by task priority
* Sort by newest
* Sort by oldest
* Sort by due date
* Reset applied filters
* Empty state when no task matches the filters

### User Interface

* Responsive Material UI dashboard
* Desktop sidebar
* Mobile navigation drawer
* Top navigation bar
* Modern blue and purple theme
* Task cards
* Status chips
* Priority badges
* Task creation and editing dialogs
* Delete confirmation dialog
* Toast notifications
* Loading states
* Empty states
* Responsive design for mobile, tablet, and desktop

## Technology Stack

* React
* Vite
* JavaScript
* Firebase Authentication
* Cloud Firestore
* Material UI
* Material UI Icons
* React Router DOM
* React Toastify
* Recharts
* Emotion
* ESLint
* Vercel

## Application Routes

| Route        | Description                           | Access    |
| ------------ | ------------------------------------- | --------- |
| `/login`     | User login page                       | Public    |
| `/signup`    | User registration page                | Public    |
| `/dashboard` | Dashboard statistics and recent tasks | Protected |
| `/tasks`     | Task management page                  | Protected |
| `*`          | Not found page                        | Public    |

Unauthenticated users are redirected to the login page when they try to access protected routes.

Authenticated users are redirected away from the login and signup pages.

## Firestore Database Structure

TaskFlow uses two top-level Firestore collections:

```text
users
tasks
```

### Users Collection

Document path:

```text
users/{userId}
```

The document ID is the Firebase Authentication UID.

Example user document:

```javascript
{
  name: "Hamad Ali Khan",
  email: "example@gmail.com",
  createdAt: Timestamp
}
```

### Tasks Collection

Document path:

```text
tasks/{taskId}
```

Example task document:

```javascript
{
  userId: "firebase-auth-user-uid",
  title: "Complete Firebase project",
  description: "Finish authentication, dashboard, and CRUD operations",
  status: "pending",
  priority: "high",
  dueDate: "2026-06-25",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Supported task statuses:

```text
pending
in-progress
completed
```

Supported task priorities:

```text
low
medium
high
```

Every task contains the logged-in user's UID. This allows the application to retrieve only the tasks belonging to the current user.

## Project Structure

```text
TaskFlow/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   └── tasks/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── firebase/
│   │   └── firebase.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── Signup.jsx
│   │   └── Tasks.jsx
│   ├── services/
│   │   ├── authService.js
│   │   └── taskService.js
│   ├── theme/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

### Clone the Repository

```bash
git clone https://github.com/HamadAliKhan022/TaskFlow.git
cd TaskFlow
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the local address displayed by Vite in the terminal.

It normally looks similar to:

```text
http://localhost:5173
```

## Firebase Setup

To run the application with your own Firebase project:

1. Create a project in Firebase Console.
2. Register a Firebase Web application.
3. Enable Email and Password Authentication.
4. Create a Cloud Firestore database.
5. Open `src/firebase/firebase.js`.
6. Replace the Firebase configuration with your own values.

Example Firebase configuration:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
```

## Firestore Security Rules

The following rules ensure that users can access only their own profile and tasks:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow create, read, update, delete:
        if request.auth != null
        && request.auth.uid == userId;
    }

    match /tasks/{taskId} {
      allow create:
        if request.auth != null
        && request.resource.data.userId == request.auth.uid;

      allow read, delete:
        if request.auth != null
        && resource.data.userId == request.auth.uid;

      allow update:
        if request.auth != null
        && resource.data.userId == request.auth.uid
        && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

## Available Scripts

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Check the project using ESLint:

```bash
npm run lint
```

## Deployment

The application is deployed on Vercel.

To deploy another version:

1. Push the project to GitHub.
2. Log in to Vercel.
3. Import the GitHub repository.
4. Select Vite as the framework.
5. Use the following build command:

```bash
npm run build
```

6. Set the output directory to:

```text
dist
```

7. Deploy the project.

## Learning Outcomes

This project demonstrates practical understanding of:

* React components
* React hooks
* React Router
* Authentication state management
* Firebase Authentication
* Cloud Firestore
* Real-time Firestore listeners
* Firestore CRUD operations
* Protected routing
* Form validation
* Search, filter, and sorting logic
* Dashboard analytics
* Responsive Material UI design
* Vercel deployment
* Git and GitHub workflow

## Author

**Hamad Ali Khan**

* GitHub: [HamadAliKhan022](https://github.com/HamadAliKhan022)

## Acknowledgement

TaskFlow was developed as a practical project to implement authentication, a dashboard, and complete CRUD functionality using React and Firebase.
