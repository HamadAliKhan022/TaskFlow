import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const chartColors = ["#F59E0B", "#0EA5E9", "#22C55E"];

export default function TaskChart({ pending, inProgress, completed }) {
  const data = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Completed", value: completed },
  ];
  const total = pending + inProgress + completed;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3, height: "100%", "&:last-child": { pb: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Box>
            <Typography variant="h6">Task status</Typography>
            <Typography variant="body2" color="text.secondary">
              Distribution of your current workload
            </Typography>
          </Box>
        </Stack>

        {total === 0 ? (
          <Box sx={{ minHeight: 285, display: "grid", placeItems: "center", textAlign: "center" }}>
            <Box>
              <Typography fontWeight={750}>No chart data yet</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Create your first task to see the status chart.
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="47%"
                  innerRadius={62}
                  outerRadius={94}
                  paddingAngle={4}
                >
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E7EAF0",
                    boxShadow: "0 10px 30px rgba(16,24,40,0.1)",
                  }}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
