import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import { useNavigate } from "react-router-dom";
import {
  formatDueDate,
  PRIORITY_META,
  STATUS_META,
} from "../../utils/taskUtils";

export default function RecentTasks({ tasks }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Box>
            <Typography variant="h6">Recent tasks</Typography>
            <Typography variant="body2" color="text.secondary">
              Your latest task activity
            </Typography>
          </Box>
          <Button
            size="small"
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={() => navigate("/tasks")}
          >
            View all
          </Button>
        </Stack>

        {tasks.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography fontWeight={750}>No tasks created yet</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Use Quick Add Task to begin planning your work.
            </Typography>
          </Box>
        ) : (
          <Stack divider={<Divider flexItem />}>
            {tasks.map((task) => {
              const status = STATUS_META[task.status] || STATUS_META.pending;
              const priority = PRIORITY_META[task.priority] || PRIORITY_META.medium;

              return (
                <Stack
                  key={task.id}
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  justifyContent="space-between"
                  spacing={1.5}
                  sx={{ py: 1.8 }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography fontWeight={750} noWrap>
                      {task.title}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.7} mt={0.6}>
                      <EventRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary">
                        Due {formatDueDate(task.dueDate)}
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack direction="row" spacing={1} flexShrink={0}>
                    <Chip label={priority.label} color={priority.color} size="small" variant="outlined" />
                    <Chip label={status.label} color={status.color} size="small" />
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
