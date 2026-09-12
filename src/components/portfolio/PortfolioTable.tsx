import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, useMediaQuery, useTheme } from "@mui/material";
import type { SortingState } from "@tanstack/react-table";
import { usePortfolioStore } from "../../store/portfolioStore";
import { StockForm } from "./StockForm";
import { PortfolioToolbar } from "./PortfolioToolbar";
import { MobilePortfolioList } from "./MobilePortfolioList";

import type { PortfolioStockItem } from "../../types/portfolio.types";
import { DesktopPortfolioTable } from "./DesktopPoftfolioTable";

export const PortfolioTable = () => {
  const portfolioItems = usePortfolioStore((state) => state.portfolioItems);
  const deleteStock = usePortfolioStore((state) => state.deleteStock);

  const [stockBeingEdited, setStockBeingEdited] = useState<PortfolioStockItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tickerFilterText, setTickerFilterText] = useState("");

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredItems = portfolioItems.filter((item) =>
    item.tickerSymbol.toLowerCase().includes(tickerFilterText.toLowerCase())
  );

  return (
    <>
      <PortfolioToolbar
        tickerFilterText={tickerFilterText}
        onTickerFilterChange={setTickerFilterText}
        onAddStockClick={() => setIsAddModalOpen(true)}
      />

      {isMobileScreen ? (
        <MobilePortfolioList stocks={filteredItems} onEditClick={setStockBeingEdited} onDeleteClick={deleteStock} />
      ) : (
        <DesktopPortfolioTable
          stocks={filteredItems}
          sorting={sorting}
          onSortingChange={setSorting}
          onEditClick={setStockBeingEdited}
          onDeleteClick={deleteStock}
        />
      )}

      <Dialog open={stockBeingEdited !== null} onClose={() => setStockBeingEdited(null)} fullWidth maxWidth="xs">
        <DialogTitle>Edit Stock</DialogTitle>
        <DialogContent>
          {stockBeingEdited && (
            <StockForm
              existingStock={stockBeingEdited}
              onSuccess={() => setStockBeingEdited(null)}
              onCancel={() => setStockBeingEdited(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Add Stock</DialogTitle>
        <DialogContent>
          <StockForm onSuccess={() => setIsAddModalOpen(false)} onCancel={() => setIsAddModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};