# 🚀 TaskFlow

TaskFlow is a modern personal task management web application built with React, Firebase Authentication, and Cloud Firestore. It allows users to securely manage their personal tasks through a clean dashboard with complete CRUD functionality.

## 🌐 Live Demo

🔗 Live Application: https://task-flow-nine-ashy.vercel.app/login

🔗 GitHub Repository: https://github.com/HamadAliKhan022/TaskFlow

---

## 📖 Project Overview

TaskFlow was developed to demonstrate:

- React Fundamentals
- Firebase Authentication
- Cloud Firestore
- Protected Routes
- CRUD Operations
- Dashboard Development
- Responsive UI Design
- State Management
- Real-time Data Handling

Each user can:

- Create an account
- Log in securely
- Access a protected dashboard
- Create tasks
- View personal tasks
- Update tasks
- Delete tasks
- Track task progress

---

## ✨ Features

### 🔐 Authentication

- User Signup
- User Login
- User Logout
- Firebase Authentication
- Protected Routes
- Authentication Persistence
- Error Handling
- Form Validation

### 📊 Dashboard

- Welcome Section
- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks
- High Priority Tasks
- Completion Percentage
- Recent Tasks
- Task Status Charts

### 📝 Task Management

#### Create Task

Users can create tasks with:

- Title
- Description
- Due Date
- Status
- Priority

#### Read Tasks

- View Personal Tasks
- Responsive Task Cards
- Real-Time Updates

#### Update Tasks

- Edit Task Information
- Change Status
- Change Priority
- Update Due Date

#### Delete Tasks

- Delete Confirmation Dialog
- Permanent Removal from Firestore

---

## 🔍 Search, Filter & Sort

### Search

- Search tasks by title

### Filters

- Filter by Status
- Filter by Priority

### Sorting

- Sort by Newest
- Sort by Oldest
- Sort by Due Date

---

## 🎨 UI Features

- Material UI Components
- Responsive Design
- Mobile Friendly Layout
- Sidebar Navigation
- Dashboard Cards
- Toast Notifications
- Loading Indicators
- Confirmation Dialogs
- Modern Design System

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Material UI
- React Toastify
- Recharts

### Backend

- Firebase Authentication
- Cloud Firestore

### Deployment

- Vercel

---

## 📂 Project Structure

```bash
src/
│
├── components/
├── pages/
├── context/
├── firebase/
├── services/
├── theme/
├── utils/
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🗄️ Firestore Database Structure

### Users Collection

```javascript
users/{userId}

{
  name: "Hamad Ali Khan",
  email: "example@gmail.com",
  createdAt: Timestamp
}
```

### Tasks Collection

```javascript
tasks/{taskId}

{
  userId: "userUID",
  title: "Complete Firebase Project",
  description: "Finish dashboard and CRUD",
  status: "pending",
  priority: "high",
  dueDate: "2026-06-25",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/HamadAliKhan022/TaskFlow.git
cd TaskFlow
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## 🔥 Firebase Setup

1. Create a Firebase Project
2. Enable Authentication
3. Enable Email/Password Provider
4. Create Cloud Firestore Database
5. Add Firebase Configuration

Example:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 📜 Available Scripts

Run development server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

---

## 🚀 Deployment

This project is deployed on Vercel.

Live URL:

https://task-flow-nine-ashy.vercel.app/login

---

## 👨‍💻 Author

**Hamad Ali Khan**

GitHub:
https://github.com/HamadAliKhan022

---

## 📚 Learning Outcomes

This project demonstrates practical implementation of:

- React Components
- React Hooks
- Firebase Authentication
- Cloud Firestore CRUD
- Protected Routing
- Dashboard Development
- Responsive Design
- Vercel Deployment
- Git & GitHub Workflow
