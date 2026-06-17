import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useTheme } from "@mui/material/styles";
import TaskForm from "./TaskForm";

export default function TaskDialog({ open, task, onClose, onSubmit, submitting }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={submitting ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      PaperProps={{ sx: { borderRadius: fullScreen ? 0 : 3.5 } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <div>
            <Typography variant="h6">{task ? "Edit task" : "Add a new task"}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
              {task ? "Update the task details below." : "Add the details needed to plan this task."}
            </Typography>
          </div>
          <IconButton onClick={onClose} disabled={submitting} aria-label="Close task dialog">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ pt: "16px !important", pb: 3 }}>
        <TaskForm
          key={task?.id || "new-task"}
          initialTask={task}
          onSubmit={onSubmit}
          onCancel={onClose}
          submitting={submitting}
        />
      </DialogContent>
    </Dialog>
  );
}
