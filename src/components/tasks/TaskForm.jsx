import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../utils/taskUtils";

const emptyForm = {
  title: "",
  description: "",
  dueDate: "",
  priority: "medium",
  status: "pending",
};

export default function TaskForm({ initialTask, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title || "",
        description: initialTask.description || "",
        dueDate: initialTask.dueDate || "",
        priority: initialTask.priority || "medium",
        status: initialTask.status || "pending",
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [initialTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "Task title is required.";
    if (form.title.trim().length > 100) nextErrors.title = "Use 100 characters or fewer.";
    if (form.description.trim().length > 600) {
      nextErrors.description = "Use 600 characters or fewer.";
    }
    if (!form.dueDate) nextErrors.dueDate = "Due date is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2.2}>
        <TextField
          label="Task title"
          name="title"
          value={form.title}
          onChange={handleChange}
          error={Boolean(errors.title)}
          helperText={errors.title || "Give your task a clear, specific title."}
          fullWidth
          autoFocus
          inputProps={{ maxLength: 101 }}
        />

        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          error={Boolean(errors.description)}
          helperText={errors.description || `${form.description.length}/600 characters`}
          multiline
          minRows={4}
          fullWidth
          inputProps={{ maxLength: 601 }}
        />

        <TextField
          label="Due date"
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
          error={Boolean(errors.dueDate)}
          helperText={errors.dueDate}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            select
            label="Priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            fullWidth
          >
            {PRIORITY_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
          >
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" spacing={1.5} pt={1}>
          <Button onClick={onCancel} color="inherit" disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? "Saving..." : initialTask ? "Save Changes" : "Create Task"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
