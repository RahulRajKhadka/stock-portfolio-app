import { Chip } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface GainLossChipProps {
  gainLossPercentage: number;
}

export const GainLossChip = ({ gainLossPercentage }: GainLossChipProps) => {
  const isGain = gainLossPercentage >= 0;

  return (
    <Chip
      size="small"
      icon={isGain ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> : <ArrowDownwardIcon sx={{ fontSize: 14 }} />}
      label={`${isGain ? "+" : ""}${gainLossPercentage.toFixed(1)}%`}
      sx={{
        backgroundColor: isGain ? "#e8f5e9" : "#fdecea",
        color: isGain ? "#2e7d32" : "#c62828",
        fontWeight: 600,
        "& .MuiChip-icon": { color: isGain ? "#2e7d32" : "#c62828" },
      }}
    />
  );
};