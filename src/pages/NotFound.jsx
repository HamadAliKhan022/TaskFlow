import { Box, Button, Paper, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NotFound() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2, backgroundColor: "background.default" }}>
      <Paper sx={{ maxWidth: 520, width: "100%", p: { xs: 4, sm: 6 }, textAlign: "center" }}>
        <SearchOffRoundedIcon sx={{ fontSize: 70, color: "primary.light" }} />
        <Typography variant="h2" color="primary.main" sx={{ mt: 1 }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>
          Page not found
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          The page you requested does not exist or may have been moved.
        </Typography>
        <Button
          variant="contained"
          startIcon={<HomeRoundedIcon />}
          onClick={() => navigate(currentUser ? "/dashboard" : "/login", { replace: true })}
        >
          {currentUser ? "Back to Dashboard" : "Go to Login"}
        </Button>
      </Paper>
    </Box>
  );
}
