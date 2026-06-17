import {
  Alert,
  Box,
  Button,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteDialog from "../components/tasks/DeleteDialog";
import TaskCard from "../components/tasks/TaskCard";
import TaskDialog from "../components/tasks/TaskDialog";
import TaskFilters from "../components/tasks/TaskFilters";
import { useAuth } from "../context/AuthContext";
import {
  createTask,
  deleteTask,
  subscribeToUserTasks,
  updateTask,
  updateTaskStatus,
} from "../services/taskService";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";
import { sortTasks } from "../utils/taskUtils";

const defaultFilters = {
  search: "",
  status: "all",
  priority: "all",
  sort: "newest",
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setEditingTask(null);
      setDialogOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!currentUser?.uid) return undefined;

    setLoading(true);
    const unsubscribe = subscribeToUserTasks(
      currentUser.uid,
      (userTasks) => {
        setTasks(userTasks);
        setLoading(false);
        setError("");
      },
      (firebaseError) => {
        setError(getFirebaseErrorMessage(firebaseError));
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [currentUser?.uid]);

  const visibleTasks = useMemo(() => {
    const searchText = filters.search.trim().toLowerCase();
    const filtered = tasks.filter((task) => {
      const matchesSearch = !searchText || task.title?.toLowerCase().includes(searchText);
      const matchesStatus = filters.status === "all" || task.status === filters.status;
      const matchesPriority = filters.priority === "all" || task.priority === filters.priority;
      return matchesSearch && matchesStatus && matchesPriority;
    });

    return sortTasks(filtered, filters.sort);
  }, [tasks, filters]);

  const openCreateDialog = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const openEditDialog = (task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const closeTaskDialog = () => {
    if (submitting) return;
    setDialogOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = async (formData) => {
    setSubmitting(true);
    try {
      if (editingTask) {
        await updateTask(currentUser.uid, editingTask.id, formData);
        toast.success("Task updated successfully.");
      } else {
        await createTask(currentUser.uid, formData);
        toast.success("Task created successfully.");
      }
      setDialogOpen(false);
      setEditingTask(null);
    } catch (firebaseError) {
      toast.error(getFirebaseErrorMessage(firebaseError));
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async (task) => {
    setUpdatingId(task.id);
    try {
      await updateTaskStatus(currentUser.uid, task.id, "completed");
      toast.success("Task marked as completed.");
    } catch (firebaseError) {
      toast.error(getFirebaseErrorMessage(firebaseError));
    } finally {
      setUpdatingId("");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteTask(currentUser.uid, deleteTarget.id);
      toast.success("Task deleted successfully.");
      setDeleteTarget(null);
    } catch (firebaseError) {
      toast.error(getFirebaseErrorMessage(firebaseError));
    } finally {
      setDeleting(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box>
          <Typography variant="h4">Manage your tasks</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.7 }}>
            Create, organize, update, and complete your personal work.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={openCreateDialog}>
          Add Task
        </Button>
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}

      <TaskFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={() => setFilters(defaultFilters)}
      />

      {loading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" },
            gap: 2.5,
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={330} />
          ))}
        </Box>
      ) : visibleTasks.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" },
            gap: 2.5,
          }}
        >
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEditDialog}
              onDelete={setDeleteTarget}
              onComplete={handleComplete}
              updating={updatingId === task.id}
            />
          ))}
        </Box>
      ) : (
        <Paper variant="outlined" sx={{ py: 9, px: 3, textAlign: "center" }}>
          {tasks.length === 0 ? (
            <AssignmentTurnedInRoundedIcon sx={{ fontSize: 58, color: "primary.light" }} />
          ) : (
            <SearchOffRoundedIcon sx={{ fontSize: 58, color: "text.disabled" }} />
          )}
          <Typography variant="h6" sx={{ mt: 1.5 }}>
            {tasks.length === 0 ? "No tasks yet" : "No matching tasks"}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.7, mb: 2.5 }}>
            {tasks.length === 0
              ? "Create your first task and start tracking your progress."
              : "Try changing or clearing the current search and filters."}
          </Typography>
          {tasks.length === 0 ? (
            <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={openCreateDialog}>
              Create First Task
            </Button>
          ) : (
            <Button color="inherit" onClick={() => setFilters(defaultFilters)}>
              Clear Filters
            </Button>
          )}
        </Paper>
      )}

      <TaskDialog
        open={dialogOpen}
        task={editingTask}
        onClose={closeTaskDialog}
        onSubmit={handleSaveTask}
        submitting={submitting}
      />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        task={deleteTarget}
        onClose={() => !deleting && setDeleteTarget(null)}
        onConfirm={handleDelete}
        deleting={deleting}
      />
    </Stack>
  );
}
