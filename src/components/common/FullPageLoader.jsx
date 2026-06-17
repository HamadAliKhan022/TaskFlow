import { Box, CircularProgress, Typography } from "@mui/material";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";

export default function FullPageLoader() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: "background.default",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <TaskAltRoundedIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>
          TaskFlow
        </Typography>
        <CircularProgress size={30} />
      </Box>
    </Box>
  );
}
