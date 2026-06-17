import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  formatDueDate,
  formatTimestamp,
  isTaskOverdue,
  PRIORITY_META,
  STATUS_META,
} from "../../utils/taskUtils";

export default function TaskCard({ task, onEdit, onDelete, onComplete, updating }) {
  const status = STATUS_META[task.status] || STATUS_META.pending;
  const priority = PRIORITY_META[task.priority] || PRIORITY_META.medium;
  const overdue = isTaskOverdue(task);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderTop: "4px solid",
        borderTopColor:
          task.priority === "high"
            ? "error.main"
            : task.priority === "low"
              ? "success.main"
              : "warning.main",
        transition: "transform 180ms ease, box-shadow 180ms ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 18px 42px rgba(16,24,40,0.09)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5, flex: 1 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1.5}>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: 18,
                textDecoration: task.status === "completed" ? "line-through" : "none",
                color: task.status === "completed" ? "text.secondary" : "text.primary",
              }}
            >
              {task.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Created {formatTimestamp(task.createdAt)}
            </Typography>
          </Box>
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Edit task">
              <IconButton size="small" onClick={() => onEdit(task)} aria-label="Edit task">
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete task">
              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(task)}
                aria-label="Delete task"
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Typography
          color="text.secondary"
          variant="body2"
          sx={{
            mt: 2,
            minHeight: 61,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            whiteSpace: "pre-line",
          }}
        >
          {task.description || "No description was added for this task."}
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={1} mt={2.3}>
          <Chip label={status.label} color={status.color} size="small" />
          <Chip label={`${priority.label} priority`} color={priority.color} variant="outlined" size="small" />
          {overdue && <Chip label="Overdue" color="error" size="small" />}
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.8} mt={2.3}>
          <CalendarMonthRoundedIcon sx={{ fontSize: 18, color: overdue ? "error.main" : "text.secondary" }} />
          <Typography variant="body2" color={overdue ? "error.main" : "text.secondary"} fontWeight={650}>
            Due {formatDueDate(task.dueDate)}
          </Typography>
        </Stack>
      </CardContent>

      <Divider />
      <CardActions sx={{ px: 2.5, py: 1.5, justifyContent: "flex-end" }}>
        {task.status === "completed" ? (
          <Stack direction="row" alignItems="center" spacing={0.8} color="success.main">
            <CheckCircleRoundedIcon fontSize="small" />
            <Typography variant="body2" fontWeight={750}>
              Completed
            </Typography>
          </Stack>
        ) : (
          <Button
            size="small"
            color="success"
            startIcon={<CheckCircleRoundedIcon />}
            onClick={() => onComplete(task)}
            disabled={updating}
          >
            Mark completed
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
