import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { getFirebaseErrorMessage } from "../../utils/firebaseErrors";

export const drawerWidth = 276;

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardRoundedIcon /> },
  { label: "My Tasks", path: "/tasks", icon: <ChecklistRoundedIcon /> },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, currentUser, logout } = useAuth();

  const name = userProfile?.name || currentUser?.displayName || "TaskFlow User";
  const email = userProfile?.email || currentUser?.email || "";

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You have been logged out.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error));
    }
  };

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", p: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1.3} sx={{ px: 1, py: 1.5 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            display: "grid",
            placeItems: "center",
            borderRadius: 2.5,
            color: "common.white",
            background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
            boxShadow: "0 10px 24px rgba(79,70,229,0.28)",
          }}
        >
          <TaskAltRoundedIcon />
        </Box>
        <Box>
          <Typography variant="h6" lineHeight={1.1}>
            TaskFlow
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Personal workspace
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ px: 1.5, fontWeight: 800, letterSpacing: "0.09em" }}
      >
        Workspace
      </Typography>

      <List sx={{ mt: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              selected={active}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              sx={{
                mb: 0.75,
                borderRadius: 2.5,
                minHeight: 48,
                color: active ? "primary.main" : "text.secondary",
                "&.Mui-selected": {
                  backgroundColor: "rgba(79,70,229,0.1)",
                  "&:hover": { backgroundColor: "rgba(79,70,229,0.14)" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: active ? 750 : 650 }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ mt: "auto" }}>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" alignItems="center" spacing={1.2} sx={{ px: 1, mb: 1.5 }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography fontWeight={750} noWrap variant="body2">
              {name}
            </Typography>
            <Typography color="text.secondary" noWrap variant="caption">
              {email}
            </Typography>
          </Box>
        </Stack>
        <ListItemButton
          onClick={handleLogout}
          sx={{ borderRadius: 2.5, color: "error.main" }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
            <LogoutRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontWeight: 700 }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  const paperStyles = {
    width: drawerWidth,
    borderRight: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  };

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": paperStyles,
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": paperStyles,
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
