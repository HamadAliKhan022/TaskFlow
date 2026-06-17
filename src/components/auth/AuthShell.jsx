import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

const features = [
  {
    icon: <AutoAwesomeRoundedIcon />,
    title: "Stay focused",
    text: "Organize daily work with priorities, due dates, and clear statuses.",
  },
  {
    icon: <InsightsRoundedIcon />,
    title: "See your progress",
    text: "Track completion rates and task activity from one dashboard.",
  },
  {
    icon: <ShieldRoundedIcon />,
    title: "Your private workspace",
    text: "Every account can access only its own personal tasks.",
  },
];

export default function AuthShell({ children, heading, subheading }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "stretch",
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          width: "46%",
          p: 6,
          color: "common.white",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(145deg, #312E81 0%, #4F46E5 50%, #7C3AED 100%)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.08)",
            right: -150,
            top: -120,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.16)",
            left: -120,
            bottom: -80,
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Box
              sx={{
                width: 44,
                height: 44,
                display: "grid",
                placeItems: "center",
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.16)",
                backdropFilter: "blur(10px)",
              }}
            >
              <TaskAltRoundedIcon />
            </Box>
            <Typography variant="h5">TaskFlow</Typography>
          </Stack>

          <Box sx={{ my: "auto", maxWidth: 520 }}>
            <Typography variant="h2" sx={{ fontSize: { lg: 48, xl: 58 }, mb: 2 }}>
              Make every day more productive.
            </Typography>
            <Typography sx={{ fontSize: 18, color: "rgba(255,255,255,0.78)", mb: 5 }}>
              A clean personal workspace for planning, tracking, and completing the tasks that matter.
            </Typography>

            <Stack spacing={2.5}>
              {features.map((feature) => (
                <Stack key={feature.title} direction="row" spacing={2}>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 42,
                      height: 42,
                      borderRadius: 2.5,
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "rgba(255,255,255,0.12)",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography fontWeight={750}>{feature.title}</Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 0.4 }}>
                      {feature.text}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.65)" }}>
            Plan clearly. Work confidently. Finish consistently.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: "grid", placeItems: "center", py: 4 }}>
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              border: { xs: "none", sm: "1px solid" },
              borderColor: "divider",
              borderRadius: 4,
              p: { xs: 1, sm: 4.5 },
              boxShadow: { xs: "none", sm: "0 24px 70px rgba(16,24,40,0.08)" },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ display: { xs: "flex", lg: "none" }, mb: 4 }}
            >
              <TaskAltRoundedIcon color="primary" />
              <Typography variant="h6">TaskFlow</Typography>
            </Stack>

            <Typography variant="h4" sx={{ mb: 1 }}>
              {heading}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              {subheading}
            </Typography>
            {children}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
