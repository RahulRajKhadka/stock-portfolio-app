import { Box, Avatar, Typography } from "@mui/material";
import { getTickerAvatarColor } from "../../utils/portfolioCalculation";


interface TickerBadgeProps {
  tickerSymbol: string;
  size?: number;
}

export const TickerBadge = ({ tickerSymbol, size = 28 }: TickerBadgeProps) => {
  const avatarColors = getTickerAvatarColor(tickerSymbol);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Avatar
        sx={{
          width: size,
          height: size,
          fontSize: size <= 28 ? 12 : 14,
          fontWeight: 700,
          backgroundColor: avatarColors.background,
          color: avatarColors.color,
        }}
      >
        {tickerSymbol.charAt(0)}
      </Avatar>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {tickerSymbol}
      </Typography>
    </Box>
  );
};