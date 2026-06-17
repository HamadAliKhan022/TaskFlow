import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import LowPriorityRoundedIcon from "@mui/icons-material/LowPriorityRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/dashboard/StatCard";
import TaskChart from "../components/dashboard/TaskChart";
import RecentTasks from "../components/dashboard/RecentTasks";
import { useAuth } from "../context/AuthContext";
import { subscribeToUserTasks } from "../services/taskService";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";
import { sortTasks } from "../utils/taskUtils";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

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

  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((task) => task.status === "pending").length;
    const inProgress = tasks.filter(
      (task) => task.status === "in-progress",
    ).length;
    const completed = tasks.filter(
      (task) => task.status === "completed",
    ).length;
    const highPriority = tasks.filter(
      (task) => task.priority === "high",
    ).length;
    const completion = total ? Math.round((completed / total) * 100) : 0;

    return { total, pending, inProgress, completed, highPriority, completion };
  }, [tasks]);

  const recentTasks = useMemo(
    () => sortTasks(tasks, "newest").slice(0, 5),
    [tasks],
  );
  const firstName = (
    userProfile?.name ||
    currentUser?.displayName ||
    "there"
  ).split(" ")[0];

  if (loading) {
    return (
      <Stack spacing={3}>
        <Skeleton variant="rounded" height={160} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={145} />
          ))}
        </Box>
        <Skeleton variant="rounded" height={360} />
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      {error && <Alert severity="error">{error}</Alert>}

      <Paper
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          overflow: "hidden",
          position: "relative",
          color: "common.white",
          background:
            "linear-gradient(120deg, #3730A3 0%, #4F46E5 55%, #7C3AED 100%)",
          boxShadow: "0 18px 42px rgba(79,70,229,0.24)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 250,
            height: 250,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.08)",
            right: -60,
            top: -110,
          }}
        />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={2}
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Box>
            <Typography variant="h4">Welcome back, {firstName}!</Typography>
            <Typography sx={{ mt: 1, color: "rgba(255,255,255,0.78)" }}>
              You have {stats.pending + stats.inProgress} active task
              {stats.pending + stats.inProgress === 1 ? "" : "s"}. Keep moving
              forward.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => navigate("/tasks?new=1")}
            sx={{
              backgroundColor: "common.white",
              color: "primary.dark",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
            }}
          >
            Quick Add Task
          </Button>
        </Stack>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        <StatCard
          title="Total tasks"
          value={stats.total}
          subtitle="All tasks in your workspace"
          icon={<AssignmentRoundedIcon />}
          color="primary"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          subtitle="Tasks waiting to be started"
          icon={<PendingActionsRoundedIcon />}
          color="warning"
        />
        <StatCard
          title="In progress"
          value={stats.inProgress}
          subtitle="Tasks currently being worked on"
          icon={<HourglassTopRoundedIcon />}
          color="info"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          subtitle="Tasks successfully finished"
          icon={<CheckCircleRoundedIcon />}
          color="success"
        />
        <StatCard
          title="High priority"
          value={stats.highPriority}
          subtitle="Tasks requiring close attention"
          icon={<LowPriorityRoundedIcon />}
          color="error"
        />
        <StatCard
          title="Completion"
          value={`${stats.completion}%`}
          subtitle="Percentage of all tasks completed"
          icon={<TrendingUpRoundedIcon />}
          color="secondary"
        />
      </Box>

      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" mb={1.2}>
          <Typography fontWeight={750}>Overall completion</Typography>
          <Typography fontWeight={800} color="primary.main">
            {stats.completion}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={stats.completion}
          sx={{
            height: 10,
            borderRadius: 10,
            backgroundColor: "rgba(79,70,229,0.1)",
          }}
        />
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            xl: "minmax(360px, 0.85fr) minmax(520px, 1.4fr)",
          },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        <TaskChart
          pending={stats.pending}
          inProgress={stats.inProgress}
          completed={stats.completed}
        />
        <RecentTasks tasks={recentTasks} />
      </Box>
    </Stack>
  );
}
