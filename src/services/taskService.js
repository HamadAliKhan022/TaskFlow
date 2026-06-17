import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const tasksCollection = collection(db, "tasks");
const allowedStatuses = new Set(["pending", "in-progress", "completed"]);
const allowedPriorities = new Set(["low", "medium", "high"]);

function cleanTaskData(task) {
  return {
    title: task.title.trim(),
    description: task.description.trim(),
    dueDate: task.dueDate,
    status: allowedStatuses.has(task.status) ? task.status : "pending",
    priority: allowedPriorities.has(task.priority) ? task.priority : "medium",
  };
}

export function subscribeToUserTasks(userId, onSuccess, onError) {
  if (!userId) return () => {};

  const userTasksQuery = query(
    tasksCollection,
    where("userId", "==", userId),
  );

  return onSnapshot(
    userTasksQuery,
    (snapshot) => {
      const tasks = snapshot.docs.map((taskDocument) => ({
        id: taskDocument.id,
        ...taskDocument.data(),
      }));
      onSuccess(tasks);
    },
    onError,
  );
}

export async function createTask(userId, task) {
  if (!userId) throw new Error("You must be logged in to create a task.");

  return addDoc(tasksCollection, {
    ...cleanTaskData(task),
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateTask(userId, taskId, task) {
  if (!userId) throw new Error("You must be logged in to update a task.");

  return updateDoc(doc(db, "tasks", taskId), {
    ...cleanTaskData(task),
    userId,
    updatedAt: serverTimestamp(),
  });
}

export async function updateTaskStatus(userId, taskId, status) {
  if (!userId) throw new Error("You must be logged in to update a task.");
  if (!allowedStatuses.has(status)) throw new Error("Invalid task status.");

  return updateDoc(doc(db, "tasks", taskId), {
    userId,
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTask(userId, taskId) {
  if (!userId) throw new Error("You must be logged in to delete a task.");
  return deleteDoc(doc(db, "tasks", taskId));
}
