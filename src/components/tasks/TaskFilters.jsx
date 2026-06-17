import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../utils/taskUtils";

export default function TaskFilters({ filters, onChange, onClear }) {
  const hasFilters =
    filters.search ||
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.sort !== "newest";

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "minmax(220px, 2fr) 1fr 1fr",
            lg: "minmax(280px, 2fr) 1fr 1fr 1fr auto",
          },
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Search by task title"
          value={filters.search}
          onChange={(event) => onChange("search", event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={(event) => onChange("status", event.target.value)}
        >
          <MenuItem value="all">All statuses</MenuItem>
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Priority"
          value={filters.priority}
          onChange={(event) => onChange("priority", event.target.value)}
        >
          <MenuItem value="all">All priorities</MenuItem>
          {PRIORITY_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Sort"
          value={filters.sort}
          onChange={(event) => onChange("sort", event.target.value)}
        >
          <MenuItem value="newest">Newest first</MenuItem>
          <MenuItem value="oldest">Oldest first</MenuItem>
          <MenuItem value="due-date">Due date</MenuItem>
        </TextField>

        <Button
          onClick={onClear}
          disabled={!hasFilters}
          color="inherit"
          startIcon={<FilterAltOffRoundedIcon />}
          sx={{
            whiteSpace: "nowrap",
            gridColumn: { sm: "1 / -1", lg: "auto" },
          }}
        >
          Clear
        </Button>
      </Box>
    </Paper>
  );
}
