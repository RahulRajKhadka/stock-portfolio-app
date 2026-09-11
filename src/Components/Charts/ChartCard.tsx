import { Paper, Typography, Box } from "@mui/material";
import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

export const ChartCard = ({ title, children }: ChartCardProps) => {
  return (
    <Paper elevation={2} sx={{ padding: 2, borderRadius: 2, marginBottom: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box>{children}</Box>
    </Paper>
  );
};