import { Card, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TickerBadge } from "./TickerBadge";
import { GainLossChip } from "./GainLossChip";

import type { PortfolioStockItem } from "../../types/portfolio.types";
import { calculateGainLossPercentage } from "../../utils/portfolioCalculation";

interface PortfolioStockCardProps {
  stock: PortfolioStockItem;
  onEditClick: (stock: PortfolioStockItem) => void;
  onDeleteClick: (stockId: string) => void;
}

export const PortfolioStockCard = ({ stock, onEditClick, onDeleteClick }: PortfolioStockCardProps) => {
  const gainLossPercentage = calculateGainLossPercentage(stock);

  return (
    <Card variant="outlined" sx={{ padding: 2, borderRadius: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <TickerBadge tickerSymbol={stock.tickerSymbol} size={36} />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", marginLeft: "44px", marginTop: -0.5 }}>
            {stock.companyName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton size="small" onClick={() => onEditClick(stock)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDeleteClick(stock.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 0.5, marginTop: 1.5 }}>
        <Typography variant="caption" color="text.secondary">Quantity</Typography>
        <Typography variant="body2" sx={{ textAlign: "right" }}>{stock.quantity}</Typography>

        <Typography variant="caption" color="text.secondary">Purchase price</Typography>
        <Typography variant="body2" sx={{ textAlign: "right" }}>${stock.purchasePrice.toFixed(2)}</Typography>

        <Typography variant="caption" color="text.secondary">Current price</Typography>
        <Typography variant="body2" sx={{ textAlign: "right", fontWeight: 600 }}>${stock.currentPrice.toFixed(2)}</Typography>

        <Typography variant="caption" color="text.secondary">Purchase date</Typography>
        <Typography variant="body2" sx={{ textAlign: "right" }}>{stock.purchaseDate}</Typography>
      </Box>

      <Box sx={{ marginTop: 1.5 }}>
        <GainLossChip gainLossPercentage={gainLossPercentage} />
      </Box>
    </Card>
  );
};