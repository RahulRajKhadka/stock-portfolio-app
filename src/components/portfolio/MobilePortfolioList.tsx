import { Box } from "@mui/material";

import type { PortfolioStockItem } from "../../types/portfolio.types";
import { PortfolioStockCard } from "./PortfolioStockCard";

interface MobilePortfolioListProps {
  stocks: PortfolioStockItem[];
  onEditClick: (stock: PortfolioStockItem) => void;
  onDeleteClick: (stockId: string) => void;
}

export const MobilePortfolioList = ({ stocks, onEditClick, onDeleteClick }: MobilePortfolioListProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {stocks.map((stock) => (
        <PortfolioStockCard key={stock.id} stock={stock} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
      ))}
    </Box>
  );
};