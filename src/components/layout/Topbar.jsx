import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { getFirebaseErrorMessage } from "../../utils/firebaseErrors";

const pageTitles = {
  "/dashboard": { title: "Dashboard", subtitle: "Overview of your productivity" },
  "/tasks": { title: "My Tasks", subtitle: "Plan and manage your work" },
};

export default function Topbar({ onMenuClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, currentUser, logout } = useAuth();

  const page = pageTitles[location.pathname] || pageTitles["/dashboard"];
  const name = userProfile?.name || currentUser?.displayName || "User";

  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      await logout();
      toast.success("You have been logged out.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error));
    }
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(16px)",
        zIndex: 10,
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 68, sm: 76 }, px: { xs: 2, sm: 3 } }}>
        <IconButton
          onClick={onMenuClick}
          edge="start"
          sx={{ mr: 1.5, display: { md: "none" } }}
          aria-label="Open navigation menu"
        >
          <MenuRoundedIcon />
        </IconButton>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" noWrap>
            {page.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {page.subtitle}
          </Typography>
        </Box>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
            <Typography variant="body2" fontWeight={750}>
              {name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Personal account
            </Typography>
          </Box>
          <Tooltip title="Account menu">
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
              <Avatar sx={{ width: 38, height: 38, bgcolor: "primary.main" }}>
                {name.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Stack>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ sx: { mt: 1, minWidth: 190, borderRadius: 2.5 } }}
        >
          <MenuItem disabled>
            <PersonRoundedIcon fontSize="small" sx={{ mr: 1.2 }} />
            {name}
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
            <LogoutRoundedIcon fontSize="small" sx={{ mr: 1.2 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
