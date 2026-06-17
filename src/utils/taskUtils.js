export const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const STATUS_META = {
  pending: { label: "Pending", color: "warning" },
  "in-progress": { label: "In Progress", color: "info" },
  completed: { label: "Completed", color: "success" },
};

export const PRIORITY_META = {
  low: { label: "Low", color: "success" },
  medium: { label: "Medium", color: "warning" },
  high: { label: "High", color: "error" },
};

export function timestampToMillis(value) {
  if (!value) return 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.toDate === "function") return value.toDate().getTime();
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  if (typeof value.seconds === "number") return value.seconds * 1000;
  return 0;
}

export function parseDateOnly(value) {
  if (!value || typeof value !== "string") return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDueDate(value) {
  const date = parseDateOnly(value);
  if (!date) return "No due date";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatTimestamp(value) {
  const milliseconds = timestampToMillis(value);
  if (!milliseconds) return "Just now";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(milliseconds));
}

export function isTaskOverdue(task) {
  if (!task?.dueDate || task.status === "completed") return false;
  const dueDate = parseDateOnly(task.dueDate);
  if (!dueDate) return false;
  dueDate.setHours(23, 59, 59, 999);
  return dueDate.getTime() < Date.now();
}

export function sortTasks(tasks, sortBy = "newest") {
  const result = [...tasks];

  if (sortBy === "oldest") {
    return result.sort(
      (a, b) => timestampToMillis(a.createdAt) - timestampToMillis(b.createdAt),
    );
  }

  if (sortBy === "due-date") {
    return result.sort((a, b) => {
      const aTime = parseDateOnly(a.dueDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const bTime = parseDateOnly(b.dueDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      return aTime - bTime;
    });
  }

  return result.sort(
    (a, b) => timestampToMillis(b.createdAt) - timestampToMillis(a.createdAt),
  );
}
