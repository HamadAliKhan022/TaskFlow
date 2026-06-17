import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

const colorStyles = {
  primary: { background: "rgba(79,70,229,0.11)", color: "#4F46E5" },
  secondary: { background: "rgba(124,58,237,0.11)", color: "#7C3AED" },
  warning: { background: "rgba(245,158,11,0.13)", color: "#D97706" },
  info: { background: "rgba(14,165,233,0.12)", color: "#0284C7" },
  success: { background: "rgba(34,197,94,0.12)", color: "#16A34A" },
  error: { background: "rgba(239,68,68,0.11)", color: "#DC2626" },
};

export default function StatCard({ title, value, subtitle, icon, color = "primary" }) {
  const style = colorStyles[color] || colorStyles.primary;

  return (
    <Card
      sx={{
        height: "100%",
        transition: "transform 180ms ease, box-shadow 180ms ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 18px 42px rgba(16,24,40,0.09)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography color="text.secondary" variant="body2" fontWeight={650}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, mb: 0.5 }}>
              {value}
            </Typography>
            <Typography color="text.secondary" variant="caption">
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              borderRadius: 3,
              backgroundColor: style.background,
              color: style.color,
              "& svg": { fontSize: 25 },
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
