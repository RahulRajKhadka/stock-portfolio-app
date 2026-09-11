import { Paper, Typography, Box, Chip } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import type { ReactNode } from "react";

interface LegendItem {
  color: string;
  label: string;
}

interface ChartCardProps {
  title: string;
  dateRangeLabel?: string;
  legendItems?: LegendItem[];
  footnote?: string;
  footnoteColor?: string;
  children: ReactNode;
}

export const ChartCard = ({
  title,
  dateRangeLabel,
  legendItems,
  footnote,
  footnoteColor,
  children,
}: ChartCardProps) => {
  return (
    <Paper elevation={0} sx={{ padding: 2.5, borderRadius: 3, marginBottom: 3, border: "1px solid #eee" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {dateRangeLabel && (
          <Chip
            icon={<CalendarTodayIcon sx={{ fontSize: 14 }} />}
            label={dateRangeLabel}
            size="small"
            sx={{ backgroundColor: "#eef4ff", color: "#1976d2", fontWeight: 500 }}
          />
        )}
      </Box>

      {legendItems && (
        <Box sx={{ display: "flex", gap: 2, marginBottom: 1 }}>
          {legendItems.map((item) => (
            <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: item.color }} />
              <Typography variant="caption" color="text.secondary">
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      <Box>{children}</Box>

      {footnote && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, marginTop: 1.5 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: footnoteColor ?? "#c62828" }} />
          <Typography variant="caption" color="text.secondary">
            {footnote}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};